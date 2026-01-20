import axios from 'axios';

const api = axios.create({
    baseURL: 'https://proofa-backend-40641038540.europe-west1.run.app',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Standard Backend Response Wrapper
export interface BackendResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface User {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    name?: string; // composite
    role?: string;
    persona?: string;
    pqc_public_key?: string;
    access_token?: string;
    user_id?: string; // Alias for id, used in some components
}

export interface LoginResult {
    access_token: string;
    refresh_token: string;
    user: User;
}

export interface RegisterResult {
    user: User;
    access_token?: string; // Sometimes returned directly or inside user
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
// API Methods
// API Methods
export const proofaApi = {
    auth: {
        login: (email: string, password: string) =>
            api.post<BackendResponse<LoginResult>>("/auth/login", {
                email,
                password
            }),
        register: (email: string, password: string, firstName: string, lastName: string, newsletterSubscribed: boolean, termsAccepted: boolean) =>
            api.post<BackendResponse<LoginResult>>("/auth/register", {
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                newsletter_subscribed: newsletterSubscribed,
                terms_accepted: termsAccepted
            }),
        completeProfile: (persona: string, token: string) =>
            api.post<BackendResponse<{ user: User }>>("/auth/complete-profile", {
                persona
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
        socialLogin: (idToken: string) =>
            api.post<BackendResponse<LoginResult>>("/auth/social-login", {
                id_token: idToken
            }),
        getProfile: (token: string) =>
            api.get<BackendResponse<User>>("/auth/profile", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
    },
    registry: {
        upload: (data: { user_id: string; content: string; metadata: string }) =>
            api.post<any>('/registry/upload', data),
    },
    proofa: {
        calculate: (data: { user_id: string; seed_id: string; prompt: string }) =>
            api.post<CalculationResponse>('/proofa/calculate', data),
        getCertificate: (id: string) =>
            api.get<CertificateResponse>(`/proofa/certificate/${id}`),
    }
};

export default api;
