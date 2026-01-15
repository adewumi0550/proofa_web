package service

import (
	"context"
	"fmt"
	"strings"

	"crypto/sha256"
	"encoding/hex"
	"time"

	"github.com/adewumi0550/proofa_web/backend-go/internal/pkg/ai"
	"github.com/adewumi0550/proofa_web/backend-go/internal/repository"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/pgvector/pgvector-go"
)

type SeedEngine struct {
	repo  *repository.Queries
	judge ai.Judge
}

func NewSeedEngine(repo *repository.Queries, judge ai.Judge) *SeedEngine {
	return &SeedEngine{
		repo:  repo,
		judge: judge,
	}
}

type SeedVerificationResult struct {
	ProjectID       uuid.UUID
	Status          string // GREEN, YELLOW, AI-SEED
	PlagiarismScore float64
	AIProbability   float64
	InternalMatch   bool
	BirthHash       string
	Reasoning       string
}

func (s *SeedEngine) VerifySeed(ctx context.Context, userID uuid.UUID, seedText string) (*SeedVerificationResult, error) {
	// 1. Check for simple commands (Default Yellow)
	if isSimpleCommand(seedText) {
		project, err := s.repo.CreateProject(ctx, repository.CreateProjectParams{
			UserID:        pgtype.UUID{Bytes: userID, Valid: true},
			SeedText:      seedText,
			Status:        "YELLOW",
			AiProbability: pgtype.Float8{Float64: 100.0, Valid: true}, // High default for commands
		})
		if err != nil {
			return nil, err
		}
		return &SeedVerificationResult{
			ProjectID:     project.ID.Bytes,
			Status:        "YELLOW",
			AIProbability: 100.0,
		}, nil
	}

	// 2. Vector Check (Internal Uniqueness)
	embedding, err := s.judge.EmbedText(ctx, seedText)
	if err != nil {
		return nil, fmt.Errorf("failed to generate embedding: %w", err)
	}

	vector := pgvector.NewVector(embedding)
	matches, err := s.repo.SearchProjects(ctx, repository.SearchProjectsParams{
		UserID:    pgtype.UUID{Bytes: userID, Valid: true},
		Embedding: vector,
		Limit:     1,
	})

	internalMatch := false
	if err == nil && len(matches) > 0 {
		// If similarity is very high (> 0.95), consider it a duplicate
		if matches[0].Similarity > 0.95 {
			internalMatch = true
		}
	}

	// 3. AI Pattern Flag (Gemini Flash)
	aiProb, err := s.judge.DetectAI(ctx, seedText)
	if err != nil {
		return nil, fmt.Errorf("AI detection failed: %w", err)
	}

	// 4. Copyleaks / Web Plagiarism (Mocked for now)
	plagiarismScore := s.mockWebSearch(seedText)

	// 5. Label Logic
	status := "GREEN"
	reasoning := "Unique human-authored seed detected."

	if aiProb > 90.0 {
		status = "AI-SEED"
		reasoning = "High AI probability detected. Higher proof threshold required."
	} else if plagiarismScore > 20.0 {
		status = "PLAGIARIZED"
		reasoning = "External plagiarism match detected."
	} else if internalMatch {
		status = "YELLOW"
		reasoning = "Internal similarity match. Protecting existing authorship."
	} else if aiProb > 70.0 {
		status = "YELLOW"
		reasoning = "Moderate AI patterns detected."
	}

	// 6. Birth-Hash (Moment of Truth)
	birthHash := ""
	if status != "PLAGIARIZED" && !internalMatch {
		birthHash = generateBirthHash(userID, seedText)
	}

	// 7. Save Project
	project, err := s.repo.CreateProject(ctx, repository.CreateProjectParams{
		UserID:          pgtype.UUID{Bytes: userID, Valid: true},
		SeedText:        seedText,
		Embedding:       vector,
		PlagiarismScore: pgtype.Float8{Float64: plagiarismScore, Valid: true},
		AiProbability:   pgtype.Float8{Float64: aiProb, Valid: true},
		Status:          status,
	})
	if err != nil {
		return nil, err
	}

	return &SeedVerificationResult{
		ProjectID:       project.ID.Bytes,
		Status:          status,
		PlagiarismScore: plagiarismScore,
		AIProbability:   aiProb,
		InternalMatch:   internalMatch,
		BirthHash:       birthHash,
		Reasoning:       reasoning,
	}, nil
}

func generateBirthHash(userID uuid.UUID, text string) string {
	timestamp := time.Now().UnixNano()
	data := fmt.Sprintf("%s:%s:%d", userID.String(), text, timestamp)
	hash := sha256.Sum256([]byte(data))
	return hex.EncodeToString(hash[:])
}

func isSimpleCommand(text string) bool {
	lower := strings.ToLower(strings.TrimSpace(text))

	// Catch "Screenshot" or "Uploaded File" patterns which indicate low creative intent in text
	if strings.Contains(lower, "screenshot") || strings.Contains(lower, "uploaded file") {
		return true
	}

	commands := []string{
		"explain", "write a", "create a", "how to", "tell me", "summarize",
		"what is", "help me", "analyze this", "give me",
	}
	for _, cmd := range commands {
		if strings.HasPrefix(lower, cmd) {
			return true
		}
	}
	// Also check for very short text which usually lacks creative intent
	if len(text) < 20 {
		return true
	}
	return false
}

func (s *SeedEngine) mockWebSearch(text string) float64 {
	// In a real implementation, this would call Copyleaks or Google Search API
	// For demo, we return a low score unless it's a known "copied" text placeholder
	if strings.Contains(strings.ToLower(text), "lorem ipsum") {
		return 95.0
	}
	return 2.5
}
