#!/bin/bash
echo "🚀 Testing Proofa Industrial API (Port 8080)..."

echo "\n1. Registering User..."
curl -s -X POST http://localhost:8080/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email": "demo@proofa.tech", "firebase_uid": "dev_user"}' | json_pp

echo "\n1.5 Checking Creative Seed (Smart Status)..."
curl -s -X POST http://localhost:8080/v1/proofa/seed-check \
     -H "Content-Type: application/json" \
     -d '{"user_id": "00000000-0000-0000-0000-000000000000", "seed_text": "An original concept for a space odyssey."}' | json_pp

echo "\n2. Uploading Creative Seed..."
curl -s -X POST http://localhost:8080/v1/registry/upload \
     -H "Content-Type: application/json" \
     -d '{"user_id": "00000000-0000-0000-0000-000000000000", "content": "Sample Seed."}' | json_pp

echo "\n3. Calculating Human Authorship Score (EU AI Law)..."
curl -s -X POST http://localhost:8080/v1/proofa/calculate \
     -H "Content-Type: application/json" \
     -d '{"user_id": "00000000-0000-0000-0000-000000000000", "prompt": "Check authorship."}' | json_pp

echo "\n✅ Demo Complete."
