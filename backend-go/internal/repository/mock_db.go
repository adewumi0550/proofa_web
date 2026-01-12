package repository

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

// MockDB implements DBTX for zero-config demonstration
type MockDB struct {
	Users map[string]User
	Seeds map[string]CreativeSeed
}

func NewMockDB() *MockDB {
	return &MockDB{
		Users: make(map[string]User),
		Seeds: make(map[string]CreativeSeed),
	}
}

func (m *MockDB) Exec(ctx context.Context, query string, args ...interface{}) (pgconn.CommandTag, error) {
	// Simple mock routing based on query signature
	// Real implementation requires parsing, but for demo we just log
	return pgconn.CommandTag{}, nil
}

func (m *MockDB) Query(ctx context.Context, query string, args ...interface{}) (pgx.Rows, error) {
	return nil, fmt.Errorf("mock_db: query not implemented")
}

func (m *MockDB) QueryRow(ctx context.Context, query string, args ...interface{}) pgx.Row {
	return &MockRow{}
}

// MockRow avoids panics on Scan() calls
type MockRow struct{}

func (m *MockRow) Scan(dest ...interface{}) error {
	// return fmt.Errorf("mock_db: database not connected")
	return nil
}
