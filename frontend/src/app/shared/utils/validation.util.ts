import { UI_CONSTANTS } from "../constants";

export class ValidationUtil {
  static validateTaskTitle(title: string): {
    isValid: boolean;
    message?: string;
  } {
    if (!title || typeof title !== "string") {
      return { isValid: false, message: "Title is required" };
    }

    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      return { isValid: false, message: "Title cannot be empty" };
    }

    if (trimmedTitle.length < UI_CONSTANTS.MIN_TITLE_LENGTH) {
      return {
        isValid: false,
        message: `Title must be at least ${UI_CONSTANTS.MIN_TITLE_LENGTH} character long`,
      };
    }

    if (trimmedTitle.length > UI_CONSTANTS.MAX_TITLE_LENGTH) {
      return {
        isValid: false,
        message: `Title cannot exceed ${UI_CONSTANTS.MAX_TITLE_LENGTH} characters`,
      };
    }

    return { isValid: true };
  }

  static sanitizeTaskTitle(title: string): string {
    return title.trim();
  }

  static validateTaskId(id: string): { isValid: boolean; message?: string } {
    if (!id || typeof id !== "string") {
      return { isValid: false, message: "Task ID is required" };
    }

    if (id.trim().length === 0) {
      return { isValid: false, message: "Task ID cannot be empty" };
    }

    return { isValid: true };
  }
}
