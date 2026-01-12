import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response Types
export interface RegisterResponse {
    id: string;
    email: string;
    pqc_public_key: string;
    message: string;
    user_id: string; // Legacy/Duplicate for safety
}

export interface RegistryResponse {
    seed_id: string;
    status: string;
    // Mock fields that might optionally be returned or inferred
    hash?: string;
}

export interface CalculationResponse {
    human_score: number; // 0.0 to 1.0 field from backend
    reasoning: string;
    evidence_hash: string;
}

export interface CertificateResponse {
    id: string;
    registry_id: string;
    score: number;
    issue_date: string;
    signature: string;
}

// API Methods
export const proofaApi = {
    auth: {
        register: (email: string, password: string, firstName: string, lastName: string) =>
            api.post<RegisterResponse>("/auth/register", {
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                firebase_uid: "test-uid-" + Date.now()
            }),
    },
    registry: {
        upload: (data: { user_id: string; content: string; metadata: string }) =>
            api.post<RegistryResponse>('/registry/upload', data),
    },
    proofa: {
        calculate: (data: { user_id: string; seed_id: string; prompt: string }) =>
            api.post<CalculationResponse>('/proofa/calculate', data),
        getCertificate: (id: string) =>
            api.get<CertificateResponse>(`/proofa/certificate/${id}`),
    }
};

export default api;
