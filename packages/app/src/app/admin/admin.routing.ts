import { Routes, RouterModule } from "@angular/router";
import { OverviewComponent } from "./pages/overview/overview.component";

const adminRoutes: Routes = [
  { path: "admin", component: OverviewComponent  }
];

export const AdminRouting = RouterModule.forChild(adminRoutes);
