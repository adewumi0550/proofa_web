#!/bin/bash
set -e

BASE_URL="http://localhost:8080/v1"

echo "1. Registering User..."
USER_RESP=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@proofa.tech", "password":"password123", "first_name":" Test", "last_name":"User", "firebase_uid":"test-uid-123"}')
echo "Response: $USER_RESP"
USER_ID=$(echo $USER_RESP | jq -r '.id')
echo "User ID: $USER_ID"

if [ "$USER_ID" == "null" ] || [ -z "$USER_ID" ]; then
  echo "Failed to get User ID"
  exit 1
fi

echo -e "\n2. Uploading Seed..."
SEED_RESP=$(curl -s -X POST "$BASE_URL/registry/upload" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\":\"$USER_ID\", \"content\":\"This is a test seed file content for verification.\", \"metadata\":\"{}\"}")
echo "Response: $SEED_RESP"
SEED_ID=$(echo $SEED_RESP | jq -r '.seed_id')
echo "Seed ID: $SEED_ID"

echo -e "\n3. Calculating Score (Prompting)..."
curl -s -X POST "$BASE_URL/proofa/calculate" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\":\"$USER_ID\", \"seed_id\":\"$SEED_ID\", \"prompt\":\"Write a poem about verification.\", \"model_id\":\"gemini-pro\"}" > calc_response.json

echo "Response stored in calc_response.json"
cat calc_response.json

echo -e "\n4. Checking Debug State (Evidence)..."
DEBUG_RESP=$(curl -s -X GET "http://localhost:8080/v1/debug/state")
echo "Debug State: $DEBUG_RESP"

EVIDENCE_COUNT=$(echo $DEBUG_RESP | jq '.evidence | length')
echo -e "\nEvidence Count: $EVIDENCE_COUNT"

if [ "$EVIDENCE_COUNT" -gt 0 ]; then
  echo "SUCCESS: Evidence persisted."
else
  echo "FAILURE: Evidence not found."
fi
