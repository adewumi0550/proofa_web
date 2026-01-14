package service

import (
	"context"
	"fmt"

	"github.com/adewumi0550/proofa_web/backend-go/internal/pkg/pqc"
	"github.com/adewumi0550/proofa_web/backend-go/internal/repository"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

// AuthService handles user registration and authentication
type AuthService struct {
	repo *repository.Queries
	// In-memory cache for demo visualization (since MockDB is hard to genericize)
	usersCache map[string]*repository.User
}

// NewAuthService creates a new authentication service
func NewAuthService(repo *repository.Queries) *AuthService {
	return &AuthService{
		repo:       repo,
		usersCache: make(map[string]*repository.User),
	}
}

func (s *AuthService) DebugGetUsers() []repository.User {
	users := []repository.User{}
	for _, u := range s.usersCache {
		users = append(users, *u)
	}
	return users
}

// RegisterUser registers a new user, links with Firebase, and generates PQC keys
func (s *AuthService) RegisterUser(ctx context.Context, email, password, firstName, lastName, firebaseUID string) (*repository.User, error) {
	if s.repo == nil {
		return nil, fmt.Errorf("repository not initialized")
	}
	// 1. Generate PQC Key Pair
	keys, err := pqc.GenerateKeys()
	if err != nil {
		return nil, fmt.Errorf("failed to generate PQC keys for user: %w", err)
	}

	// 2. Persist User and PQC Public Key (Private Key encrypted in real scenario)
	user, err := s.repo.CreateUser(ctx, repository.CreateUserParams{
		Email:                  email,
		FirebaseUid:            firebaseUID,
		PqcPublicKey:           string(keys.PublicKey),
		PqcPrivateKeyEncrypted: string(keys.PrivateKey), // Mocking encryption
	})
	if err != nil {
		return nil, fmt.Errorf("failed to persist user: %w", err)
	}

	// MOCK DB FIX: If repo returns empty struct (MockDB limitation), populate it manually
	if !user.ID.Valid {
		uid := uuid.New()
		user.ID = pgtype.UUID{Bytes: uid, Valid: true}
		user.Email = email
		user.FirebaseUid = firebaseUID
		user.PqcPublicKey = string(keys.PublicKey)
		user.PqcPrivateKeyEncrypted = string(keys.PrivateKey)
		// Timestamp roughly now
	}

	// 3. Cache for Demo
	s.usersCache[user.ID.String()] = &user

	return &user, nil
}
