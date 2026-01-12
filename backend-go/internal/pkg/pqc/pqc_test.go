package pqc

import (
	"crypto/sha256"
	"encoding/hex"
	"testing"
)

func TestPQCSigning(t *testing.T) {
	// 1. Generate Keys
	keys, err := GenerateKeys()
	if err != nil {
		t.Fatalf("Failed to generate keys: %v", err)
	}

	// 2. Data to sign
	data := "proofa_test_interaction_data"
	hash := sha256.Sum256([]byte(data))
	hashStr := hex.EncodeToString(hash[:])

	// 3. Sign
	sig, err := Sign(keys.PrivateKey, []byte(hashStr))
	if err != nil {
		t.Fatalf("Failed to sign data: %v", err)
	}

	// 4. Verify
	valid, err := Verify(keys.PublicKey, []byte(hashStr), sig)
	if err != nil {
		t.Fatalf("Verification failed with error: %v", err)
	}

	if !valid {
		t.Error("Signature verification failed: expected true, got false")
	}
}
