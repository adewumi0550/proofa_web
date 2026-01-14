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

func (m *mockJudge) AnalyzeProcess(ctx context.Context, currentPrompt string, history []string) (*ProofaResult, error) {
	return &ProofaResult{
		Score:         0.9,
		Reasoning:     "Mock process analysis",
		IsAIProxy:     false,
		CreativeDelta: 0.7,
	}, nil
}

func (m *mockJudge) DetectAI(ctx context.Context, text string) (float64, error) {
	return 5.0, nil
}

func (m *mockJudge) EmbedText(ctx context.Context, text string) ([]float32, error) {
	return make([]float32, 1024), nil
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
