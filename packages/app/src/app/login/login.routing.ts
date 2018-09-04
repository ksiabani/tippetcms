import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";

const loginRoutes: Routes = [{ path: "", component: LoginComponent }];

export const LoginRouting = RouterModule.forChild(loginRoutes);
