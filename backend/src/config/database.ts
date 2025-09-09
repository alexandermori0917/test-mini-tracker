// Database configuration
// In a real application, this would connect to a proper database
// For now, we're using in-memory storage

export const connectDatabase = async (): Promise<void> => {
  try {
    console.log("✅ Database connected (In-memory storage)");
    console.log("📝 Note: Data will be lost on server restart");
  } catch (error) {
    console.error("❌ Database connection failed:", (error as Error).message);
    process.exit(1);
  }
};
