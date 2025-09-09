import { Request, Response, NextFunction } from "express";
import { taskService } from "../services/taskService";
import { ApiResponse, Task } from "../types";

export class TaskController {
  public async getAllTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tasks = await taskService.getAllTasks();
      const response: ApiResponse<Task[]> = {
        success: true,
        data: tasks,
        count: tasks.length,
      };
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  public async getTaskById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ success: false, error: "Task ID is required" });
        return;
      }
      const task = await taskService.getTaskById(id);

      const response: ApiResponse<Task> = {
        success: true,
        data: task,
      };
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  public async createTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskData = req.body;
      const newTask = await taskService.createTask(taskData);

      const response: ApiResponse<Task> = {
        success: true,
        data: newTask,
        message: "Task created successfully",
      };
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async updateTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ success: false, error: "Task ID is required" });
        return;
      }
      const updates = req.body;
      const updatedTask = await taskService.updateTask(id, updates);

      const response: ApiResponse<Task> = {
        success: true,
        data: updatedTask,
        message: "Task updated successfully",
      };
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  public async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ success: false, error: "Task ID is required" });
        return;
      }
      await taskService.deleteTask(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const taskController = new TaskController();
