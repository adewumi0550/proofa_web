-- Projects table for Step 1: The Seed Engine
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    seed_text TEXT NOT NULL,
    embedding vector(1024),
    plagiarism_score FLOAT8,
    ai_probability FLOAT8,
    status TEXT NOT NULL DEFAULT 'PROCESSING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Index for semantic similarity search on projects
CREATE INDEX ON projects USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
