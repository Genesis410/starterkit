export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Authorization failed') {
    super(message, 403);
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, 500);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

// Type for API responses
export type ApiResponse<T> = {
  data?: T;
  error?: string;
  success: boolean;
};

// Type for API response with error handling
export type ApiResponseWithResult<T> = 
  | { data: T; error: null; success: true }
  | { data: null; error: string; success: false };

// Utility function to handle API responses
export function handleApiResponse<T>(
  response: T | null,
  error: string | null
): ApiResponseWithResult<T> {
  if (error) {
    return {
      data: null,
      error,
      success: false
    };
  }

  return {
    data: response as T,
    error: null,
    success: true
  };
}