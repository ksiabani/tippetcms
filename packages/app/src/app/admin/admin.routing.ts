import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./pages/admin/admin.component";
import { AdminGuard } from "./guards/admin/admin.guard";

const adminRoutes: Routes = [
  { path: "admin", component: AdminComponent, canActivate: [AdminGuard] }
];

export const AdminRouting = RouterModule.forChild(adminRoutes);
