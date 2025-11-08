import { apiFetch } from "@/lib/client/api";
import type { ApiSuccessResponse } from "@/types/rest";
import type { IUser } from "@/types/user";

export async function login(identifier: string, password: string): Promise<{ userId: string, token: string }> {
    const response = await apiFetch<ApiSuccessResponse<{ userId: string, token: string }>>('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ identifier, password })
    });

    return response.data;
}

export async function register(email: string, username: string, password: string): Promise<{ userId: string, token: string }> {
    const response = await apiFetch<ApiSuccessResponse<{ userId: string, token: string }>>('/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ email, username, password })
    });
    return response.data;
}

export async function fetchUserProfile(): Promise<IUser | null> {
    const authToken = sessionStorage.getItem('authToken') ?? localStorage.getItem('authToken');
    console.log('authToken:', authToken);

    const response = await apiFetch<ApiSuccessResponse<IUser | null>>('/user/profile', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    sessionStorage.setItem("authUser", JSON.stringify(response.data));
    return response.data;
}