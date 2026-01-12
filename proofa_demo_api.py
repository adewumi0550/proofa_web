from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import hashlib
import uuid
from datetime import datetime

# Global storage for the last project (for browser demo)
LAST_PROJECT = {"message": "No project registered yet."}

class PQCSignerMock:
    def __init__(self):
        self.algorithm = "ML-DSA-65 (Dilithium3)"

    def sign_metadata(self, metadata):
        metadata_str = json.dumps(metadata, sort_keys=True)
        raw_hash = hashlib.sha3_512(metadata_str.encode()).hexdigest()
        return f"pqc_{self.algorithm}_{raw_hash[:64]}"

class ProofaAPIHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        global LAST_PROJECT
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        # Allow any origin for testing
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        
        if self.path == "/":
            response = {"message": "Welcome to the Proofa Mock API Gateway", "status": "active"}
        elif self.path == "/v1/last-project":
            response = LAST_PROJECT
        else:
            response = {"error": "Not Found"}
            self.send_response(404)
            
        self.wfile.write(json.dumps(response).encode())

    def do_POST(self):
        global LAST_PROJECT
        if self.path == "/v1/projects":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode())

            # Logic from Projects Endpoint
            project_id = f"proj_{uuid.uuid4().hex[:8]}"
            content_hash = hashlib.sha256(data['content'].encode()).hexdigest()
            
            metadata = {
                "project_id": project_id,
                "source_hash": content_hash,
                "creator_id": data.get('creator_id', 'anonymous'),
                "timestamp": datetime.utcnow().isoformat()
            }
            
            signer = PQCSignerMock()
            pqc_signature = signer.sign_metadata(metadata)
            
            response = {
                "project_id": project_id,
                "source_hash": content_hash,
                "pqc_signature": pqc_signature,
                "status": "SOURCE_REGISTERED",
                "message": "Human authorship locked and PQC-sealed."
            }
            
            # Save for the browser demo
            LAST_PROJECT = response

            self.send_response(201)
            self.send_header("Content-type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
        elif self.path.startswith("/v1/projects") and self.path.endswith("/transform"):
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode())
            
            project_id = self.path.split('/')[-2]
            model_id = data.get('model_id', 'unknown')
            
            response = {
                "message": f"Transformation started via {model_id}",
                "project_id": project_id,
                "transformation_id": f"trans_{uuid.uuid4().hex[:8]}",
                "status": "LINEAGE_TRACKED",
                "result_url": f"https://storage.proofa.tech/refined/{project_id}/output.mp4"
            }
            
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_error(404)

def run(server_class=HTTPServer, handler_class=ProofaAPIHandler, port=8000):
    server_address = ('127.0.0.1', port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting Proofa Mock API on port {port}...")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
