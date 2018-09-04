import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRouting } from "./admin.routing";
import { OverviewComponent } from "./pages/overview/overview.component";

@NgModule({
  imports: [CommonModule, AdminRouting],
  declarations: [OverviewComponent]
})
export class AdminModule {}
