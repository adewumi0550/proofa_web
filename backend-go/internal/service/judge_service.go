package service

import (
	"context"
	"fmt"

	"github.com/adewumi0550/proofa_web/backend-go/internal/pkg/ai"
	"github.com/adewumi0550/proofa_web/backend-go/internal/repository"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type JudgeEngine struct {
	repo  *repository.Queries
	judge ai.Judge
}

func NewJudgeEngine(repo *repository.Queries, judge ai.Judge) *JudgeEngine {
	return &JudgeEngine{
		repo:  repo,
		judge: judge,
	}
}

type ScoreUpdateResult struct {
	HumanScore    float64
	Reasoning     string
	IsAIProxy     bool
	CreativeDelta float64
}

func (s *JudgeEngine) UpdateScore(ctx context.Context, userID uuid.UUID, seedID uuid.UUID, currentPrompt string) (*ScoreUpdateResult, error) {
	// 1. Fetch History
	history, err := s.repo.GetEvidenceLogsBySeed(ctx, pgtype.UUID{Bytes: seedID, Valid: true})
	if err != nil {
		return nil, fmt.Errorf("failed to fetch prompt history: %w", err)
	}

	// 2. Perform AnalyzeProcess (Delta + Proxy Check)
	res, err := s.judge.AnalyzeProcess(ctx, currentPrompt, history)
	if err != nil {
		return nil, fmt.Errorf("AI analysis failed: %w", err)
	}

	// 3. Save Evidence Log (Notarization step would follow, but user asked for logic only)
	// We'll return the result for now. The caller (handler) should handle persistence if needed.

	return &ScoreUpdateResult{
		HumanScore:    res.Score,
		Reasoning:     res.Reasoning,
		IsAIProxy:     res.IsAIProxy,
		CreativeDelta: res.CreativeDelta,
	}, nil
}
