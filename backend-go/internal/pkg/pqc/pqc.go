package pqc

import (
	"crypto/rand"
	"fmt"

	"github.com/cloudflare/circl/sign/dilithium/mode3"
)

const (
	// DilithiumLevel is the recommended security level
	DilithiumLevel = "Dilithium3"
)

// Keys represents a PQC key pair
type Keys struct {
	PublicKey  []byte
	PrivateKey []byte
}

// GenerateKeys generates a new Dilithium key pair
func GenerateKeys() (*Keys, error) {
	pub, priv, err := mode3.GenerateKey(rand.Reader)
	if err != nil {
		return nil, fmt.Errorf("failed to generate PQC keys: %w", err)
	}

	pubBytes, _ := pub.MarshalBinary()
	privBytes, _ := priv.MarshalBinary()

	return &Keys{
		PublicKey:  pubBytes,
		PrivateKey: privBytes,
	}, nil
}

// Sign signs the provided data using the private key
func Sign(privateKey []byte, data []byte) ([]byte, error) {
	scheme := mode3.Scheme()
	priv, err := scheme.UnmarshalBinaryPrivateKey(privateKey)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal private key: %w", err)
	}

	sig := scheme.Sign(priv, data, nil)
	return sig, nil
}

// Verify verifies the signature against the data and public key
func Verify(publicKey []byte, data []byte, signature []byte) (bool, error) {
	scheme := mode3.Scheme()
	pub, err := scheme.UnmarshalBinaryPublicKey(publicKey)
	if err != nil {
		return false, fmt.Errorf("failed to unmarshal public key: %w", err)
	}

	return scheme.Verify(pub, data, signature, nil), nil
}
