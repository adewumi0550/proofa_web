package ai

import (
	"encoding/json"
	"fmt"
	"os"
)

// JudgeConfig represents the EU AI Law compliance configuration
type JudgeConfig struct {
	SystemIdentity string `json:"system_identity"`
	LegalFramework struct {
		Primary           string   `json:"primary"`
		SecondaryMandates []string `json:"secondary_mandates"`
	} `json:"legal_framework"`
	JudgeInstructions string `json:"judge_instructions"`
	ComplianceRules   []struct {
		ID          string  `json:"id"`
		Metric      string  `json:"metric"`
		Description string  `json:"description"`
		Weight      float64 `json:"weight"`
	} `json:"compliance_rules"`
}

// LoadJudgeConfig loads the judge specification from a JSON file
func LoadJudgeConfig(path string) (*JudgeConfig, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("failed to read judge spec: %w", err)
	}

	var config JudgeConfig
	if err := json.Unmarshal(data, &config); err != nil {
		return nil, fmt.Errorf("failed to unmarshal judge spec: %w", err)
	}

	return &config, nil
}
