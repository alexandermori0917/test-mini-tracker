# Mini Task Tracker Application

Тестовое задание: "Мини-Трекер Задач"

A simple single-page application (SPA) for task management with Node.js/Express backend and Angular frontend using PrimeNG components.

## Features

- ✅ View all tasks in a PrimeNG table format
- ✅ Add new tasks via modal dialog with form validation
- ✅ Toggle task completion status with checkboxes (real-time backend updates)
- ✅ Delete tasks with confirmation dialog
- ✅ Responsive design with modern UI
- ✅ Error handling and user notifications

## Project Structure

```
task-tracker/
├── backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── app.ts             # Express application setup
│   │   ├── server.ts          # Server configuration
│   │   ├── controllers/       # Route controllers
│   │   ├── services/          # Business logic
│   │   ├── models/            # Data models
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Custom middleware
│   │   └── utils/             # Utility functions
│   ├── package.json           # Backend dependencies
│   └── tsconfig.json          # TypeScript configuration
├── frontend/                   # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.component.ts           # Main application component
│   │   │   ├── features/task/             # Task feature module
│   │   │   │   ├── task.component.ts      # Main task component
│   │   │   │   └── components/            # Task-related components
│   │   │   │       ├── task-table/        # Task table component
│   │   │   │       ├── task-dialog/       # Add task dialog
│   │   │   │       └── task-header/       # Task header component
│   │   │   ├── core/services/             # Core services
│   │   │   │   ├── task.service.ts        # Task API service
│   │   │   │   └── notification.service.ts # Notification service
│   │   │   └── shared/                    # Shared utilities
│   │   │       ├── types/                 # TypeScript interfaces
│   │   │       ├── constants/             # Application constants
│   │   │       └── utils/                 # Utility functions
│   │   ├── environments/                  # Environment configurations
│   │   ├── main.ts                       # Application bootstrap
│   │   └── styles.css                    # Global styles
│   ├── package.json                      # Frontend dependencies
│   └── angular.json                      # Angular configuration
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Angular CLI (v17)

## Setup and Running

### Backend (Node.js/Express)

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
# or for development with auto-restart:
npm run dev
```

The backend will run on `http://localhost:3000`

### Frontend (Angular)

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
# or
ng serve
```

The frontend will run on `http://localhost:4200`

## API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/tasks` | Get all tasks | - |
| `POST` | `/api/tasks` | Create a new task | `{ "title": string, "completed": boolean }` |
| `PATCH` | `/api/tasks/:id` | Update a task | `{ "title"?: string, "completed"?: boolean }` |
| `DELETE` | `/api/tasks/:id` | Delete a task | - |

### Example API Usage

**Create a new task:**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Angular", "completed": false}'
```

**Update task completion:**
```bash
curl -X PATCH http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

## Usage

1. Start both backend and frontend servers
2. Open `http://localhost:4200` in your browser
3. Use the "Add New Task" button to create tasks via modal dialog
4. Click checkboxes in the table to toggle task completion status
5. Click the trash icon to delete tasks (with confirmation)
6. All changes are automatically saved to the backend

## Task Requirements Implementation

### Backend (Node.js + Express) ✅
- [x] Simple Express application
- [x] HTTP server setup
- [x] REST API for tasks (CRUD operations)
- [x] GET /api/tasks - returns array of all tasks
- [x] POST /api/tasks - creates new task with generated ID
- [x] PATCH /api/tasks/:id - updates task (partial updates supported)
- [x] DELETE /api/tasks/:id - deletes task

### Frontend (Angular) ✅
- [x] PrimeNG table with ID, Title, and Status columns
- [x] Checkbox functionality for task completion toggle
- [x] Delete button with trash icon
- [x] Modal dialog for adding new tasks
- [x] Form validation and error handling
- [x] Real-time updates between frontend and backend

## Technologies Used

**Backend:**
- Node.js
- Express.js
- TypeScript
- CORS middleware
- UUID for unique task IDs
- Error handling middleware

**Frontend:**
- Angular 17 (Standalone Components)
- PrimeNG 17 (UI Components)
- TypeScript
- RxJS (Reactive Programming)
- Angular Forms (Reactive Forms)
- Angular Animations

## Development Notes

- The application uses in-memory storage (tasks are not persisted between server restarts)
- All API calls include proper error handling
- The frontend includes form validation for task creation
- PrimeNG components provide a modern, responsive UI
- The application follows Angular best practices with standalone components
