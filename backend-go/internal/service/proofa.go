package service

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"

	"github.com/adewumi0550/proofa_web/backend-go/internal/pkg/ai"
	"github.com/adewumi0550/proofa_web/backend-go/internal/pkg/pqc"
	"github.com/adewumi0550/proofa_web/backend-go/internal/repository"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

// ProofaEngine orchestrates the human score calculation and evidence logging
type ProofaEngine struct {
	repo  *repository.Queries
	judge *ai.Orchestrator
	// In-memory cache for demo visualization
	evidenceCache map[string]*repository.EvidenceLog
}

// NewProofaEngine creates a new Proofa engine with an AI Judge
func NewProofaEngine(repo *repository.Queries, judge *ai.Orchestrator) *ProofaEngine {
	return &ProofaEngine{
		repo:          repo,
		judge:         judge,
		evidenceCache: make(map[string]*repository.EvidenceLog),
	}
}

// CalculateParams represents input for score calculation
type CalculateParams struct {
	UserID uuid.UUID
	Prompt string
	SeedID uuid.UUID
}

// CalculateResult represents the notarized result of score calculation
type CalculateResult struct {
	Score        float64
	Reasoning    string
	EvidenceHash string
	Signature    string
}

// Calculate calculates the human score and logs evidence asynchronously
func (e *ProofaEngine) Calculate(ctx context.Context, params CalculateParams) (*CalculateResult, error) {
	if e.repo == nil {
		return nil, fmt.Errorf("repository not initialized")
	}
	// 1. Fetch User (for PQC keys)
	user, err := e.repo.GetUserByFirebaseUID(ctx, params.UserID.String())
	if err != nil {
		// In Mock/Demo mode, we might not find the user in the strictly SQL mocked DB if scanning fails.
		// Proceed with warning or synthesized user.
		log.Printf("User lookup failed: %v. Proceeding with synthesized user for DEMO.", err)
	}

	// MOCK DB FIX: If user is empty (MockDB limitation), populate for PQC signing
	if !user.ID.Valid || user.PqcPrivateKeyEncrypted == "" {
		// Generate temp keys if needed for the signature to work
		keys, _ := pqc.GenerateKeys()
		user.ID = pgtype.UUID{Bytes: params.UserID, Valid: true}
		user.Email = "demo@proofa.tech"
		user.PqcPublicKey = string(keys.PublicKey)
		user.PqcPrivateKeyEncrypted = string(keys.PrivateKey)
	}

	// 2. Fetch Context from Registry (Semantic Search/Seed)
	var contextStr string
	if params.SeedID != uuid.Nil {
		// In a real app, query by seed_id and get content
		contextStr = "Context derived from associated creative seed."
	}

	// 3. Trigger AI Judge Verification (Gemini 3)
	judgeResult, err := e.judge.Verify(ctx, params.Prompt, contextStr)
	if err != nil {
		return nil, fmt.Errorf("AI Judge verification failed: %w", err)
	}

	// 4. Generate Interaction Hash
	interactionData := map[string]interface{}{
		"user_id": params.UserID,
		"prompt":  params.Prompt,
		"seed_id": params.SeedID,
		"score":   judgeResult.Score,
	}
	interactionJSON, _ := json.Marshal(interactionData)
	hash := sha256.Sum256(interactionJSON)
	evidenceHash := hex.EncodeToString(hash[:])

	// 5. CACHE EVIDENCE SYNCHRONOUSLY (For Admin Monitor Immediate Visibility)
	// This ensures the admin panel sees the activity instantly, oblivious to async DB latency
	immediateLog := repository.EvidenceLog{
		ID:           pgtype.UUID{Bytes: uuid.New(), Valid: true},
		UserID:       user.ID, // Uses the synthesized user ID if needed
		Prompt:       params.Prompt,
		SeedID:       toPgUUID(params.SeedID),
		HumanScore:   judgeResult.Score,
		Reasoning:    toPgText(judgeResult.Reasoning),
		EvidenceHash: evidenceHash,
		PqcSignature: "PENDING_NOTARIZATION", // Will be updated by async worker if needed, or we just show pending
	}
	// We can pre-calculate signature here if fast enough, but Dilithium might be slow?
	// Actually, for this demo, let's sign it here to be sure.
	sig, errSign := pqc.Sign([]byte(user.PqcPrivateKeyEncrypted), []byte(hash[:]))
	if errSign == nil {
		immediateLog.PqcSignature = hex.EncodeToString(sig)
	}
	e.evidenceCache[immediateLog.ID.String()] = &immediateLog
	log.Printf("[DEBUG] Synchronously cached evidence: %s", immediateLog.ID.String())

	// 6. Async Persistence (Optional now for validity, but good for "Realness")
	go func() {
		// We can just rely on the sync cache for the demo monitor.
		// But let's try to persist to DB anyway for correctness.
		e.logEvidence(context.Background(), params, judgeResult, evidenceHash, user)
	}()

	return &CalculateResult{
		Score:        judgeResult.Score,
		Reasoning:    judgeResult.Reasoning,
		EvidenceHash: evidenceHash,
		Signature:    immediateLog.PqcSignature,
	}, nil
}

func (e *ProofaEngine) logEvidence(ctx context.Context, params CalculateParams, res *ai.ProofaResult, hash string, user repository.User) error {
	// Legacy async logger - mostly for DB persistence now, cache is handled above.
	// We can keep the DB call but remove the redundant cache update to avoid race conditions.

	// Persist to DB
	_, err := e.repo.CreateEvidenceLog(ctx, repository.CreateEvidenceLogParams{
		UserID:       user.ID,
		Prompt:       params.Prompt,
		SeedID:       toPgUUID(params.SeedID),
		HumanScore:   res.Score,
		Reasoning:    toPgText(res.Reasoning),
		EvidenceHash: hash,
		PqcSignature: "ARCHIVED",
	})

	return err
}

func (e *ProofaEngine) DebugGetEvidence() []repository.EvidenceLog {
	logs := []repository.EvidenceLog{}
	for _, l := range e.evidenceCache {
		logs = append(logs, *l)
	}
	return logs
}
