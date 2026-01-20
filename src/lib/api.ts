import axios from 'axios';

const api = axios.create({
    baseURL: '/api/proxy',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor for Session Expiry
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Check if we are already on the login page to avoid loops (optional but good practice)
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                console.warn("Session expired. Redirecting to login.");
                localStorage.removeItem("proofa_user");
                window.location.href = "/login?error=session_expired";
            }
        }
        return Promise.reject(error);
    }
);

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
    credits?: number;
    plan?: string;
    kyc_verified?: boolean;
    trust_score?: number;
    projects_count?: number;
    certified_count?: number;
    avatar_url?: string;
    location?: string;
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
// Workspace Interface
export interface Workspace {
    id: string;
    user_id: string;
    name: string;
    seed_content: string;
    status: string;
    current_score: number;
    birth_hash: string;
    created_at: string;
    updated_at: string;
    members?: any;
}

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
        updateProfile: (data: { first_name?: string; last_name?: string }, token: string) =>
            api.put<BackendResponse<User>>("/auth/profile", data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
    },
    workspaces: {
        create: (data: { name: string; seed_content: string; oath_signed: boolean }, token: string) =>
            api.post<BackendResponse<Workspace>>('/workspaces', data, {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
        list: (token: string) =>
            api.get<BackendResponse<Workspace[]>>('/workspaces', {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
        get: (id: string, token: string) =>
            api.get<BackendResponse<Workspace>>(`/workspaces/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
        interact: (id: string, data: { prompt: string; mode: string; upload_id?: string[] }, token: string) =>
            api.post<BackendResponse<any>>(`/workspaces/${id}/interact`, data, {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
        certify: (id: string, token: string) =>
            api.post<BackendResponse<any>>(`/workspaces/${id}/certify`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
        getHistory: (id: string, token: string) =>
            api.get<BackendResponse<any>>(`/workspaces/${id}/history`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
    },
    files: {
        upload: (file: File, token: string, onProgress?: (progress: number) => void) => {
            const formData = new FormData();
            formData.append('document', file);
            return api.post<BackendResponse<{ storage_path: string; upload_id: string; url: string }>>('/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        if (onProgress) onProgress(progress);
                    }
                }
            });
        },
        analyze: (data: { content: string; content_type: string; upload_id: string }, token: string) =>
            api.post('/api/v1/analyze', data, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
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
