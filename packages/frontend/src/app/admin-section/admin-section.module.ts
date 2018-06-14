import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./pages/admin/admin.component";
import { AdminSectionRouting } from "./admin-section.routing";

@NgModule({
  imports: [CommonModule, AdminSectionRouting],
  declarations: [AdminComponent]
})
export class AdminSectionModule {}
