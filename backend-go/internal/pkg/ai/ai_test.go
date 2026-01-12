package ai

import (
	"context"
	"testing"
	"time"
)

type mockJudge struct{}

func (m *mockJudge) VerifyAuthorship(ctx context.Context, prompt string, seedsContext string) (*ProofaResult, error) {
	return &ProofaResult{
		Score:     0.88,
		Reasoning: "Mock reasoning",
	}, nil
}

func (m *mockJudge) Name() string {
	return "MockJudge"
}

func TestOrchestrator(t *testing.T) {
	mock := &mockJudge{}
	orch := NewOrchestrator(mock, 1*time.Second)

	res, err := orch.Verify(context.Background(), "test prompt", "test seeds")
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}

	if res.Score != 0.88 {
		t.Errorf("Expected score 0.88, got %f", res.Score)
	}

	if orch.provider.Name() != "MockJudge" {
		t.Errorf("Expected provider name MockJudge, got %s", orch.provider.Name())
	}
}
