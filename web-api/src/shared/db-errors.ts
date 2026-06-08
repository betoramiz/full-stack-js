import postgres from "postgres";
import { type ErrorResponse, PG_ERROR_CODES } from "@shared/errors/ErrorTypes.ts";
import { AppError } from "@shared/errors/AppError.ts";

export const parseDbError = (error: unknown): ErrorResponse | null => {
  if (error instanceof postgres.PostgresError) {
    switch (error.code) {
      case PG_ERROR_CODES.UNIQUE_VIOLATION:
        return AppError.Conflict(`Duplicate entry: ${error.constraint_name}`)
      case PG_ERROR_CODES.FOREIGN_KEY_VIOLATION:
        return AppError.BadRequest(`Invalid reference: ${error.constraint_name}`)
      case PG_ERROR_CODES.NOT_NULL_VIOLATION:
        return AppError.BadRequest(`Field required: ${error.column_name}`)
      default:
        return null
    }
  }

  return null
}
