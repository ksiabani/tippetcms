import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./pages/login/login.component";
import { LoginRouting } from "./login.routing";
import { MatButtonModule, MatIconModule } from "@angular/material";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./interceptors/token.interceptor";

@NgModule({
  imports: [CommonModule, LoginRouting, MatButtonModule, MatIconModule],
  declarations: [LoginComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class LoginModule {}
