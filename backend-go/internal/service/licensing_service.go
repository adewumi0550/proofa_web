package service

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"time"

	"github.com/adewumi0550/proofa_web/backend-go/internal/pkg/pqc"
	"github.com/adewumi0550/proofa_web/backend-go/internal/repository"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type LicensingService struct {
	repo *repository.Queries
}

func NewLicensingService(repo *repository.Queries) *LicensingService {
	return &LicensingService{repo: repo}
}

type AuthorshipReport struct {
	ProjectID      string   `json:"project_id"`
	HumanScore     float64  `json:"human_score"`
	Reasoning      string   `json:"reasoning"`
	EvidenceHash   string   `json:"evidence_hash"`
	LegalCitations []string `json:"legal_citations"`
	AuditLog       []string `json:"audit_log"`
	Timestamp      string   `json:"timestamp"`
	Signature      string   `json:"pqc_signature"`
}

func (s *LicensingService) CreateCollection(ctx context.Context, userID uuid.UUID, name, description string, projectIDs []uuid.UUID) (*repository.Collection, error) {
	collection, err := s.repo.CreateCollection(ctx, repository.CreateCollectionParams{
		UserID:      pgtype.UUID{Bytes: userID, Valid: true},
		Name:        name,
		Description: pgtype.Text{String: description, Valid: true},
	})
	if err != nil {
		return nil, err
	}

	for _, pid := range projectIDs {
		err := s.repo.AddItemToCollection(ctx, repository.AddItemToCollectionParams{
			CollectionID: collection.ID,
			ProjectID:    pgtype.UUID{Bytes: pid, Valid: true},
		})
		if err != nil {
			return nil, fmt.Errorf("failed to add item %s: %w", pid, err)
		}
	}

	return &collection, nil
}

func (s *LicensingService) CertifyAuthorship(ctx context.Context, userID uuid.UUID, projectID uuid.UUID) (*repository.AuthorshipCertification, error) {
	// 1. Fetch project data to verify score
	// For demo, we assume high score if status is GREEN
	// In real app, we would sum up evidence logs etc.

	report := AuthorshipReport{
		ProjectID:    projectID.String(),
		HumanScore:   0.94, // Mocking high score for demo certification
		Reasoning:    "Significant manual interventions detected in creative seed and prompt refinement.",
		EvidenceHash: "sha256:b43c...",
		LegalCitations: []string{
			"EU AI Act Article 52 (Transparency)",
			"US Copyright Office Policy (Human Authorship Requirement)",
		},
		AuditLog: []string{
			"Creation of Birth-Hash for Unique Seed",
			"Detection of Manual Prompt Enrichment (Delta > 0.4)",
			"PQC Signature from Verified Artist Device",
		},
		Timestamp: time.Now().Format(time.RFC3339),
	}

	auditJSON, _ := json.Marshal(report)
	hash := sha256.Sum256(auditJSON)
	certHash := hex.EncodeToString(hash[:])

	// 2. Fetch User for PQC signing
	user, _ := s.repo.GetUserByFirebaseUID(ctx, userID.String())
	// Fallback for demo
	if user.PqcPrivateKeyEncrypted == "" {
		keys, _ := pqc.GenerateKeys()
		user.PqcPrivateKeyEncrypted = string(keys.PrivateKey)
	}

	sig, _ := pqc.Sign([]byte(user.PqcPrivateKeyEncrypted), hash[:])

	cert, err := s.repo.CreateAuthorshipCertification(ctx, repository.CreateAuthorshipCertificationParams{
		ProjectID:         pgtype.UUID{Bytes: projectID, Valid: true},
		UserID:            pgtype.UUID{Bytes: userID, Valid: true},
		CertificationHash: certHash,
		PqcSignature:      hex.EncodeToString(sig),
		AuditData:         auditJSON,
	})

	return &cert, err
}
