import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideHttpClient } from "@angular/common/http";
import { MessageService } from "primeng/api";

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), MessageService],
}).catch((err) => console.error(err));
