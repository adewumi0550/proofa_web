package ai

import (
	"context"
	"time"
)

// ProofaResult represents the output from the AI Judge's analysis
type ProofaResult struct {
	Score     float64
	Reasoning string
}

// Judge defines the interface for verifying human authorship
type Judge interface {
	VerifyAuthorship(ctx context.Context, prompt string, seedsContext string) (*ProofaResult, error)
	Name() string
}

// Orchestrator handles calls to the active AI Judge
type Orchestrator struct {
	provider Judge
	timeout  time.Duration
}

// NewOrchestrator creates a new AI orchestrator with a specific provider
func NewOrchestrator(provider Judge, timeout time.Duration) *Orchestrator {
	return &Orchestrator{
		provider: provider,
		timeout:  timeout,
	}
}

// Verify triggers the active Judge to analyze the input
func (o *Orchestrator) Verify(ctx context.Context, prompt string, seedsContext string) (*ProofaResult, error) {
	ctx, cancel := context.WithTimeout(ctx, o.timeout)
	defer cancel()

	return o.provider.VerifyAuthorship(ctx, prompt, seedsContext)
}
