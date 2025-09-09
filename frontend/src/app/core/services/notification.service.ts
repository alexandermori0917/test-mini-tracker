import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

export interface NotificationConfig {
  severity: "success" | "info" | "warn" | "error";
  summary: string;
  detail: string;
  life?: number;
}

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private messageService: MessageService) {}

  /**
   * Show success notification
   */
  showSuccess(summary: string, detail: string, life: number = 3000): void {
    this.show({ severity: "success", summary, detail, life });
  }

  /**
   * Show error notification
   */
  showError(summary: string, detail: string, life: number = 5000): void {
    this.show({ severity: "error", summary, detail, life });
  }

  /**
   * Show warning notification
   */
  showWarning(summary: string, detail: string, life: number = 4000): void {
    this.show({ severity: "warn", summary, detail, life });
  }

  /**
   * Show info notification
   */
  showInfo(summary: string, detail: string, life: number = 3000): void {
    this.show({ severity: "info", summary, detail, life });
  }

  /**
   * Show custom notification
   */
  show(config: NotificationConfig): void {
    this.messageService.add({
      severity: config.severity,
      summary: config.summary,
      detail: config.detail,
      life: config.life || 3000,
    });
  }

  /**
   * Clear all notifications
   */
  clear(): void {
    this.messageService.clear();
  }
}
