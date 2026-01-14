package service

import (
	"testing"
)

func TestIsSimpleCommand(t *testing.T) {
	tests := []struct {
		text     string
		expected bool
	}{
		{"Explain the quantum theory", true},
		{"Write a story about a dragon", true},
		{"Hello, this is a very long and detailed creative seed I am writing.", false},
		{"Short text", true},
		{"how to fix a car", true},
		{"My original idea for a world where gravity is reversed and people live on the ceiling.", false},
	}

	for _, tt := range tests {
		t.Run(tt.text, func(t *testing.T) {
			if got := isSimpleCommand(tt.text); got != tt.expected {
				t.Errorf("isSimpleCommand(%q) = %v; want %v", tt.text, got, tt.expected)
			}
		})
	}
}
