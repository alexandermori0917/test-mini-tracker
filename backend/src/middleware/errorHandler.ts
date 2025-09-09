import { Request, Response, NextFunction } from "express";
import {
  ValidationError,
  NotFoundError,
  InternalServerError,
  AppError,
} from "../utils/errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error: AppError = { ...err } as AppError;
  error.message = err.message;

  // Log error
  console.error("Error:", err);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new NotFoundError(message);
  }

  // Mongoose duplicate key
  if ((err as any).code === 11000) {
    const message = "Duplicate field value entered";
    error = new ValidationError(message);
  }

  // Mongoose validation error
  if (err.name === "ValidationError" && (err as any).errors) {
    const message = Object.values((err as any).errors)
      .map((val: any) => val.message)
      .join(", ");
    error = new ValidationError(message);
  }

  // Default to 500 server error
  if (!error.statusCode) {
    error = new InternalServerError("Internal Server Error");
  }

  res.status(error.statusCode).json({
    success: false,
    error: error.message,
    ...(process.env["NODE_ENV"] === "development" && { stack: err.stack }),
  });
};
