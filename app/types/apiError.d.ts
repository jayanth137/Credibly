export type ErrorDetail = {
    message: string;
    domain: string;
    reason: string;
    location: string;
    locationType: string;
};

export type APIError = {
    code: number;
    message: string;
    errors: ErrorDetail[];
    status: string;
};
