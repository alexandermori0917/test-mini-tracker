import { Router } from "express";
import { taskController } from "../controllers/taskController";

const router: Router = Router();

// GET /api/tasks - Get all tasks
router.get("/", taskController.getAllTasks);

// GET /api/tasks/:id - Get task by ID
router.get("/:id", taskController.getTaskById);

// POST /api/tasks - Create a new task
router.post("/", taskController.createTask);

// PATCH /api/tasks/:id - Update a task
router.patch("/:id", taskController.updateTask);

// DELETE /api/tasks/:id - Delete a task
router.delete("/:id", taskController.deleteTask);

export default router;
