import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./pages/admin/admin.component";
import { AdminRouting } from "./admin.routing";

@NgModule({
  imports: [CommonModule, AdminRouting],
  declarations: [AdminComponent]
})
export class AdminModule {}
