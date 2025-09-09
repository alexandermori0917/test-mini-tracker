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

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

export interface HealthCheckResponse {
  success: boolean;
  message: string;
  timestamp: string;
  uptime: number;
}
