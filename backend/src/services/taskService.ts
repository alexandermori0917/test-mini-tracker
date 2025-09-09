import { taskRepository } from "../data/taskRepository";
import { ValidationError, NotFoundError } from "../utils/errors";
import { Task, CreateTaskRequest, UpdateTaskRequest } from "../types";

export class TaskService {
  public async getAllTasks(): Promise<Task[]> {
    try {
      return await taskRepository.findAll();
    } catch (error) {
      throw new Error("Failed to retrieve tasks");
    }
  }

  public async getTaskById(id: string): Promise<Task> {
    if (!id) {
      throw new ValidationError("Task ID is required");
    }

    const task = await taskRepository.findById(id);
    if (!task) {
      throw new NotFoundError("Task not found");
    }

    return task;
  }

  public async createTask(taskData: CreateTaskRequest): Promise<Task> {
    this.validateTaskData(taskData);

    try {
      return await taskRepository.create(taskData);
    } catch (error) {
      throw new Error("Failed to create task");
    }
  }

  public async updateTask(
    id: string,
    updates: UpdateTaskRequest
  ): Promise<Task> {
    if (!id) {
      throw new ValidationError("Task ID is required");
    }

    // Check if task exists
    const exists = await taskRepository.exists(id);
    if (!exists) {
      throw new NotFoundError("Task not found");
    }

    // Validate updates
    this.validateTaskUpdates(updates);

    try {
      const updatedTask = await taskRepository.update(id, updates);
      if (!updatedTask) {
        throw new NotFoundError("Task not found");
      }
      return updatedTask;
    } catch (error) {
      throw new Error("Failed to update task");
    }
  }

  public async deleteTask(id: string): Promise<boolean> {
    if (!id) {
      throw new ValidationError("Task ID is required");
    }

    const deleted = await taskRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError("Task not found");
    }

    return true;
  }

  private validateTaskData(taskData: CreateTaskRequest): void {
    if (!taskData) {
      throw new ValidationError("Task data is required");
    }

    if (!taskData.title || typeof taskData.title !== "string") {
      throw new ValidationError("Title is required and must be a string");
    }

    if (taskData.title.trim().length === 0) {
      throw new ValidationError("Title cannot be empty");
    }

    if (taskData.title.length > 255) {
      throw new ValidationError("Title cannot exceed 255 characters");
    }

    if (
      taskData.completed !== undefined &&
      typeof taskData.completed !== "boolean"
    ) {
      throw new ValidationError("Completed must be a boolean value");
    }
  }

  private validateTaskUpdates(updates: UpdateTaskRequest): void {
    if (!updates || Object.keys(updates).length === 0) {
      throw new ValidationError(
        "At least one field must be provided for update"
      );
    }

    if (updates.title !== undefined) {
      if (typeof updates.title !== "string") {
        throw new ValidationError("Title must be a string");
      }
      if (updates.title.trim().length === 0) {
        throw new ValidationError("Title cannot be empty");
      }
      if (updates.title.length > 255) {
        throw new ValidationError("Title cannot exceed 255 characters");
      }
    }

    if (
      updates.completed !== undefined &&
      typeof updates.completed !== "boolean"
    ) {
      throw new ValidationError("Completed must be a boolean value");
    }
  }
}

export const taskService = new TaskService();
