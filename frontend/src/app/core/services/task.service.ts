import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TasksApiResponse,
  TaskApiResponse,
} from "../../shared/types";
import { API_CONFIG } from "../../shared/constants";
import { ErrorHandlerUtil } from "../../shared/utils/error-handler.util";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private readonly apiUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASKS}`;

  constructor(private http: HttpClient) {}

  /**
   * Get all tasks
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<TasksApiResponse>(this.apiUrl).pipe(
      map((response) => response.data || []),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Get a specific task by ID
   */
  getTaskById(id: string): Observable<Task> {
    return this.http.get<TaskApiResponse>(`${this.apiUrl}/${id}`).pipe(
      map((response) => response.data!),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Create a new task
   */
  createTask(task: CreateTaskRequest): Observable<Task> {
    return this.http.post<TaskApiResponse>(this.apiUrl, task).pipe(
      map((response) => response.data!),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Update an existing task
   */
  updateTask(id: string, updates: UpdateTaskRequest): Observable<Task> {
    return this.http
      .patch<TaskApiResponse>(`${this.apiUrl}/${id}`, updates)
      .pipe(
        map((response) => response.data!),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Delete a task
   */
  deleteTask(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    const appError = ErrorHandlerUtil.handleHttpError(error);
    ErrorHandlerUtil.logError(appError, "TaskService");
    return throwError(() => appError);
  }
}
