import app from "./app";
import { connectDatabase } from "./config/database";

const PORT: number = parseInt(process.env["PORT"] || "3000", 10);

// Connect to database
connectDatabase();

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(
    `📡 API endpoints available at http://localhost:${PORT}/api/tasks`
  );
  console.log(`🏥 Health check available at http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env["NODE_ENV"] || "development"}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.log("❌ Unhandled Promise Rejection:", err.message);
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.log("❌ Uncaught Exception:", err.message);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("✅ Process terminated");
  });
});
