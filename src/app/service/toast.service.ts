import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private messageService: MessageService) { }

  showError(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: detail, life: 5000 });
  }

  showSuccess(detail: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: detail, life: 5000 });
  }

  showWarning(summary: string, detail: string) {
    this.messageService.add({ severity: 'warn', summary: summary, detail: detail, life: 5000 });
  }
}
