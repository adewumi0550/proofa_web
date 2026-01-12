-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    firebase_uid TEXT UNIQUE NOT NULL,
    pqc_public_key TEXT NOT NULL,
    pqc_private_key_encrypted TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Creative Seeds (Core Registry)
CREATE TABLE creative_seeds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding vector(1024),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Evidence Logs (PQC-Notarized Transactions)
CREATE TABLE evidence_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    seed_id UUID REFERENCES creative_seeds(id),
    human_score FLOAT8 NOT NULL,
    reasoning TEXT,
    evidence_hash TEXT NOT NULL,
    pqc_signature TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Indexes for high-concurrency semantic search
CREATE INDEX ON creative_seeds USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
