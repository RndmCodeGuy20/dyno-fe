export interface ApiSuccessResponse<T> {
    success: boolean;
    data: T;
}

export interface ApiErrorResponse<T> {
    success: false;
    error: T;
}

export interface ApiError {
    message: string;
    code?: string;
    details?: Record<string, unknown>;
}