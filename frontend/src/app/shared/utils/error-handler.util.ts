import { HttpErrorResponse } from "@angular/common/http";
import { AppError } from "../types";
import { MESSAGES } from "../constants";

export class ErrorHandlerUtil {
  static handleHttpError(error: HttpErrorResponse): AppError {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      return {
        message: MESSAGES.ERROR.NETWORK_ERROR,
        code: "CLIENT_ERROR",
        details: error.error.message,
      };
    } else {
      // Server-side error
      const serverError = error.error;
      return {
        message:
          serverError?.error ||
          serverError?.message ||
          MESSAGES.ERROR.UNKNOWN_ERROR,
        code: error.status.toString(),
        details: serverError,
      };
    }
  }

  static handleGenericError(error: any): AppError {
    return {
      message: error?.message || MESSAGES.ERROR.UNKNOWN_ERROR,
      code: "GENERIC_ERROR",
      details: error,
    };
  }

  static logError(error: AppError, context?: string): void {
    const logMessage = context
      ? `[${context}] ${error.message}`
      : error.message;

    console.error(logMessage, error.details);
  }
}
