import { type ErrorResponse, ErrorsCode } from "./ErrorTypes.js";

export class AppError {

  static BadRequest(message: string): ErrorResponse {
    return {
      statusCode: ErrorsCode.BAD_REQUEST,
      message: message
    };
  }

  static NotFound(message: string): ErrorResponse {
    return {
      statusCode: ErrorsCode.NOT_FOUND,
      message: message
    };
  }

  static DatabaseProblem(message: string): ErrorResponse {
    return {
      statusCode: ErrorsCode.INTERNAL_SERVER_ERROR,
      message: message
    };
  }

  static Conflict(message: string = 'Conflict'): ErrorResponse {
    return {
      statusCode: ErrorsCode.CONFLICT,
      message: message
    };
  }

  static ServiceUnavailable(message: string = 'Service unavailable'): ErrorResponse {
    return {
      statusCode: ErrorsCode.SERVICE_UNAVAILABLE,
      message: message
    };
  }
}
