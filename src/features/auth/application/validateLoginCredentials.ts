import type { LoginCredentials } from '@/features/auth/domain/LoginCredentials';

export type LoginValidationErrors = Partial<Record<keyof LoginCredentials, string>>;

export type LoginValidationResult = {
    isValid: boolean;
    errors: LoginValidationErrors;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginCredentials(credentials: LoginCredentials): LoginValidationResult {
    const errors: LoginValidationErrors = {};
    const email = credentials.email.trim();

    if (!email) {
        errors.email = 'Email address is required.';
    } else if (!EMAIL_PATTERN.test(email)) {
        errors.email = 'Enter a valid email address.';
    }

    if (!credentials.password) {
        errors.password = 'Password is required.';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}
