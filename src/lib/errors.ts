export class AppError extends Error {
    public details?: Record<string, unknown>;
    constructor(message: string, details?: Record<string, unknown>) {
        super(message);
        this.name = 'AppError';
        if (details) {
            this.details = details;
        }
    }
}   