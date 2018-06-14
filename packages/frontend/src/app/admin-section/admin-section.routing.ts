import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./pages/admin/admin.component";
import { AdminGuard } from "./guards/admin/admin.guard";

const adminSectionRoutes: Routes = [
  { path: "admin", component: AdminComponent, canActivate: [AdminGuard] }
];

export const AdminSectionRouting = RouterModule.forChild(adminSectionRoutes);
