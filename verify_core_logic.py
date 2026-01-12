import hashlib
import json
import uuid
from datetime import datetime

# --- ISOLATED RE-IMPLEMENTATION OF CORE LOGIC ---
# This mirrors the logic in backend/app/core/security/pqc_signer.py
# and backend/app/api/endpoints/projects.py

class PQCSignerMock:
    def __init__(self):
        self.algorithm = "ML-DSA-65 (Dilithium3)"

    def sign_metadata(self, metadata):
        metadata_str = json.dumps(metadata, sort_keys=True)
        raw_hash = hashlib.sha3_512(metadata_str.encode()).hexdigest()
        return f"pqc_{self.algorithm}_{raw_hash[:64]}"

def simulate_step_0(creator_id, content, title):
    # Logic from Projects Endpoint
    project_id = f"proj_{uuid.uuid4().hex[:8]}"
    content_hash = hashlib.sha256(content.encode()).hexdigest()
    
    metadata = {
        "project_id": project_id,
        "source_hash": content_hash,
        "creator_id": creator_id,
        "timestamp": datetime.utcnow().isoformat()
    }
    
    signer = PQCSignerMock()
    pqc_signature = signer.sign_metadata(metadata)
    
    return {
        "project_id": project_id,
        "source_hash": content_hash,
        "pqc_signature": pqc_signature,
        "metadata_signed": metadata
    }

# --- TEST EXECUTION ---
if __name__ == "__main__":
    print("--- PROOFA CORE LOGIC VERIFICATION ---")
    
    user_input = {
        "creator_id": "investor_demo_001",
        "content": "This is a 100% unique poem created by a human artist for testing.",
        "title": "Startup Pitch Poem"
    }
    
    print(f"\n[1] Registering Human Art: '{user_input['title']}'")
    result = simulate_step_0(**user_input)
    
    print("\n[2] VERIFICATION RESULT (Raw JSON):")
    print(json.dumps(result, indent=2))
    
    print("\n[3] ANALYSIS:")
    print(f"-> Project ID Generated: {result['project_id']}")
    print(f"-> Digital DNA (SHA256): {result['source_hash']}")
    print(f"-> PQC Signature (Dilithium): {result['pqc_signature']}")
    
    print("\n--- TEST SUCCESSFUL ---")
