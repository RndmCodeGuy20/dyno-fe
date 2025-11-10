import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { AppError } from '../errors';
import type { ApiError, ApiErrorResponse } from '../../types/rest';

export const API_BASE = 'https://api.dyno.rndmcode.in/';
// export const API_BASE = 'http://localhost:5010/api/v1';

type RequestOptions = AxiosRequestConfig & {
    query?: Record<string, string | number | boolean | undefined>;
};

const apiClient = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

function buildQuery(params?: Record<string, string | number | boolean | undefined>): string {
    if (!params) return '';
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) query.append(key, String(value));
    }
    return `?${query.toString()}`;
}

export const apiFetchWithAuth = async<T>(url: string, options: RequestOptions = {}): Promise<T> => {
    const authToken = sessionStorage.getItem('authToken') ?? localStorage.getItem('authToken');
    return apiFetch<T>(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${authToken}`,
        },
    });
};

export async function apiFetch<T>(
    path: string,
    options: RequestOptions = {}
): Promise<T> {
    const { query, headers, ...rest } = options;
    const url = `${API_BASE}${path}${buildQuery(query)}`;
    try {
        const response = await apiClient.request<T>({
            url,
            headers,
            ...rest,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError<ApiErrorResponse<ApiError>>(error)) {
            if (error.code == 'ERR_NETWORK') {
                throw new AppError('Huh! Try again later...')
            }
            const axiosError = error as AxiosError<ApiErrorResponse<ApiError>>;
            const apiError = axiosError.response?.data;
            const message = apiError?.error.message ||
                axiosError.message ||
                'An error occurred while making the API request.';
            // Wrap it in your AppError for consistency
            throw new AppError(message, {
                status: axiosError.response?.status,
                data: apiError,
            });
        }
        throw error;
    }
}
