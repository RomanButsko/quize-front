import { ApiError } from '@/shared/api';

/**
 * Default error messages for common HTTP status codes
 */
const DEFAULT_ERROR_MESSAGES: Record<number, string> = {
  400: 'Invalid request. Please check your input.',
  401: 'You are not authorized. Please log in.',
  403: 'You do not have permission to perform this action.',
  404: 'The requested resource was not found.',
  409: 'A conflict occurred. The resource may already exist.',
  422: 'Validation failed. Please check your input.',
  429: 'Too many requests. Please try again later.',
  500: 'Server error. Please try again later.',
  502: 'Service temporarily unavailable. Please try again later.',
  503: 'Service temporarily unavailable. Please try again later.',
};

const FALLBACK_ERROR_MESSAGE = 'An unexpected error occurred. Please try again.';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    if (error.message && error.message !== `Request failed with status ${error.status}`) {
      return error.message;
    }
    return DEFAULT_ERROR_MESSAGES[error.status] || FALLBACK_ERROR_MESSAGE;
  }

  if (error instanceof Error) {
    return error.message || FALLBACK_ERROR_MESSAGE;
  }

  return FALLBACK_ERROR_MESSAGE;
};
