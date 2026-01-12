package ai

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

// GeminiProvider implements the Judge interface using Google's Gemini API
type GeminiProvider struct {
	client *genai.Client
	model  *genai.GenerativeModel
	config *JudgeConfig
}

// NewGeminiProvider creates a new Gemini-based Judge provider
func NewGeminiProvider(ctx context.Context, apiKey string, config *JudgeConfig) (*GeminiProvider, error) {
	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return nil, fmt.Errorf("failed to create gemini client: %w", err)
	}

	model := client.GenerativeModel("gemini-1.5-pro")
	
	// Inject Judge instructions for EU AI Law compliance
	model.SystemInstruction = &genai.Content{
		Parts: []genai.Part{genai.Text(config.JudgeInstructions)},
	}

	return &GeminiProvider{
		client: client,
		model:  model,
		config: config,
	}, nil
}

// VerifyAuthorship analyzes the prompt against seeds for human authorship
func (p *GeminiProvider) VerifyAuthorship(ctx context.Context, prompt string, seedsContext string) (*ProofaResult, error) {
	// Construct the prompt with compliance metrics and registry context
	fullPrompt := fmt.Sprintf(`
Analyze the following prompt and registry seeds for human authorship and compliance with the %s.

Registry Context (Seeds):
%s

User Input (Prompt):
%s

Return your analysis in the following JSON format:
{
  "score": float, (0.0 to 1.0)
  "reasoning": "detailed reasoning string citing compliance metrics"
}
`, p.config.LegalFramework, seedsContext, prompt)

	resp, err := p.model.GenerateContent(ctx, genai.Text(fullPrompt))
	if err != nil {
		return nil, fmt.Errorf("gemini generation failed: %w", err)
	}

	if len(resp.Candidates) == 0 {
		return nil, fmt.Errorf("no candidates returned from gemini")
	}

	var result ProofaResult
	responseText := ""
	for _, part := range resp.Candidates[0].Content.Parts {
		if text, ok := part.(genai.Text); ok {
			responseText += string(text)
		}
	}

	// Find JSON block if wrapped in markdown
	if start := strings.Index(responseText, "{"); start != -1 {
		if end := strings.LastIndex(responseText, "}"); end != -1 {
			responseText = responseText[start : end+1]
		}
	}

	if err := json.Unmarshal([]byte(responseText), &result); err != nil {
		return nil, fmt.Errorf("failed to parse judge result: %w (raw response: %s)", err, responseText)
	}

	return &result, nil
}

func (p *GeminiProvider) Name() string {
	return "Gemini-3-Pro-Orchestrator"
}
