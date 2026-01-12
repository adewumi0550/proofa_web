package service

import (
	"context"
	"fmt"

	"github.com/adewumi0550/proofa_web/backend-go/internal/repository"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/pgvector/pgvector-go"
)

// RegistryService handles management of creative Seeds and golden samples
type RegistryService struct {
	repo *repository.Queries
	// In-memory cache for demo
	seedsCache map[string]*repository.CreativeSeed
}

// NewRegistryService creates a new registry service
func NewRegistryService(repo *repository.Queries) *RegistryService {
	return &RegistryService{
		repo:       repo,
		seedsCache: make(map[string]*repository.CreativeSeed),
	}
}

func (s *RegistryService) DebugGetSeeds() []repository.CreativeSeed {
	seeds := []repository.CreativeSeed{}
	for _, seed := range s.seedsCache {
		seeds = append(seeds, *seed)
	}
	return seeds
}

// UploadSeed stores a user's creative Seeds and generates embeddings (mocked)
func (s *RegistryService) UploadSeed(ctx context.Context, userID uuid.UUID, content string, metadata []byte) (*repository.CreativeSeed, error) {
	if s.repo == nil {
		return nil, fmt.Errorf("repository not initialized")
	}
	// In a real app, generate embedding using Gemini or another embedding model
	// We'll use a mock embedding of 1024 zeros for now
	mockEmbedding := make([]float32, 1024)

	seed, err := s.repo.CreateCreativeSeed(ctx, repository.CreateCreativeSeedParams{
		UserID:    toPgUUID(userID),
		Content:   content,
		Embedding: pgvector.NewVector(mockEmbedding),
		Metadata:  metadata,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to store creative seed: %w", err)
	}

	// MOCK DB FIX: Populate if empty
	if !seed.ID.Valid {
		sid := uuid.New()
		seed.ID = pgtype.UUID{Bytes: sid, Valid: true}
		seed.UserID = toPgUUID(userID)
		seed.Content = content
		seed.Metadata = metadata
		seed.Embedding = pgvector.NewVector(mockEmbedding)
	}

	// Cache for demo
	s.seedsCache[seed.ID.String()] = &seed

	return &seed, nil
}
