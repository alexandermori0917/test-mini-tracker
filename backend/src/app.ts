import express, { Application, Request, Response } from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";
import { HealthCheckResponse } from "./types";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Health check endpoint
app.get("/api/health", (req: Request, res: Response): void => {
  const response: HealthCheckResponse = {
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
  res.json(response);
});

// API Routes
app.use("/api/tasks", taskRoutes);

// 404 handler
app.use("*", (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
