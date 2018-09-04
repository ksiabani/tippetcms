import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./pages/login/login.component";
import { LoginRouting } from "./login.routing";
import { MatButtonModule } from "@angular/material";

@NgModule({
  imports: [CommonModule, LoginRouting, MatButtonModule],
  declarations: [LoginComponent]
})
export class LoginModule {}
