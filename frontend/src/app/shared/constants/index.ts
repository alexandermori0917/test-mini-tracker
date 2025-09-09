import { environment } from '../../../environments/environment';

// API Configuration
export const API_CONFIG = {
  BASE_URL: environment.apiBaseUrl,
  ENDPOINTS: {
    TASKS: "/api/tasks",
  },
} as const;

// UI Constants
export const UI_CONSTANTS = {
  DIALOG_WIDTH: "450px",
  TABLE_MIN_WIDTH: "50rem",
  MAX_TITLE_LENGTH: 255,
  MIN_TITLE_LENGTH: 1,
} as const;

// Messages
export const MESSAGES = {
  SUCCESS: {
    TASK_CREATED: "Task created successfully",
    TASK_UPDATED: "Task updated successfully",
    TASK_DELETED: "Task deleted successfully",
  },
  ERROR: {
    LOAD_TASKS: "Failed to load tasks",
    CREATE_TASK: "Failed to create task",
    UPDATE_TASK: "Failed to update task",
    DELETE_TASK: "Failed to delete task",
    NETWORK_ERROR: "Network error occurred",
    UNKNOWN_ERROR: "An unknown error occurred",
  },
  CONFIRM: {
    DELETE_TASK: "Are you sure you want to delete this task?",
  },
  PLACEHOLDERS: {
    TASK_TITLE: "Enter task title",
  },
} as const;

// CSS Classes
export const CSS_CLASSES = {
  STATUS: {
    COMPLETED: "status-completed",
    PENDING: "status-pending",
  },
  BUTTONS: {
    SUCCESS: "p-button-success",
    DANGER: "p-button-danger",
    TEXT: "p-button-text",
  },
} as const;

export const TASK_STATUS = {
  PENDING: "Pending",
  COMPLETED: "Completed",
} as const;
