export const ErrorsCode = {
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
  SERVICE_UNAVAILABLE: 503,
};

export const PG_ERROR_CODES = {
  UNIQUE_VIOLATION: '23505',
  FOREIGN_KEY_VIOLATION: '23503',
  NOT_NULL_VIOLATION: '23502',
  CHECK_VIOLATION: '23514',
  CONNECTION_FAILURE: '08006',
} as const

export type ErrorResponse = {
  statusCode: number;
  message?: string;
}