import { TASK_STATUS } from "../constants";

// Core Task Types
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskRequest {
  title: string;
  completed?: boolean;
}

export interface UpdateTaskRequest {
  title?: string;
  completed?: boolean;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

export interface TaskApiResponse extends ApiResponse<Task> {}
export interface TasksApiResponse extends ApiResponse<Task[]> {}

// UI State Types
export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export interface DialogState {
  visible: boolean;
  loading: boolean;
}

// Form Types
export interface TaskFormData {
  title: string;
  completed: boolean;
}

// Error Types
export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

// Table Column Types
export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  width?: string;
}

// Dialog Types
export interface DialogConfig {
  header: string;
  width: string;
  modal: boolean;
  closable: boolean;
}
