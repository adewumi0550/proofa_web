-- name: CreateUser :one
INSERT INTO users (email, firebase_uid, pqc_public_key, pqc_private_key_encrypted)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetUserByFirebaseUID :one
SELECT * FROM users WHERE firebase_uid = $1;

-- name: CreateCreativeSeed :one
INSERT INTO creative_seeds (user_id, content, embedding, metadata)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: SearchCreativeSeeds :many
SELECT *, (1 - (embedding <=> $2))::float8 AS similarity
FROM creative_seeds
WHERE user_id = $1
ORDER BY similarity DESC
LIMIT $3;

-- name: CreateEvidenceLog :one
INSERT INTO evidence_logs (user_id, prompt, seed_id, human_score, reasoning, evidence_hash, pqc_signature)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;

-- name: GetEvidenceLog :one
SELECT * FROM evidence_logs WHERE id = $1;

-- Project-related queries

-- name: CreateProject :one
INSERT INTO projects (user_id, seed_text, embedding, plagiarism_score, ai_probability, status)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: SearchProjects :many
SELECT *, (1 - (embedding <=> $2))::float8 AS similarity
FROM projects
WHERE user_id = $1
ORDER BY similarity DESC
LIMIT $3;

-- name: UpdateProjectStatus :one
UPDATE projects
SET status = $2, plagiarism_score = $3, ai_probability = $4
WHERE id = $1
RETURNING *;

-- name: GetEvidenceLogsBySeed :many
SELECT prompt FROM evidence_logs
WHERE seed_id = $1
ORDER BY created_at ASC;
