import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskComponent } from "./features/task/task.component";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, TaskComponent, ToastModule],
  template: `
    <div class="app-container">
      <app-task></app-task>
      <p-toast></p-toast>
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        background-color: #f5f5f5;
      }
    `,
  ],
})
export class AppComponent {}
