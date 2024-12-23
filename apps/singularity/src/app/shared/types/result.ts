export type Result<T> = {
    status: number;
    message: string;
    body: T;
    hasError: boolean;
};