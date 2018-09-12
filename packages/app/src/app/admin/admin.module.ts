import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRouting } from "./admin.routing";
import { OverviewComponent } from "./pages/overview/overview.component";
import { ElementsComponent } from "./pages/elements/elements.component";
import { MediaComponent } from "./pages/media/media.component";
import { PagesComponent } from "./pages/pages/pages.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { AddPageDialogComponent } from "./components/add-page-dialog/add-page-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule,
  MatInputModule,
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    AdminRouting,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    OverviewComponent,
    ElementsComponent,
    MediaComponent,
    PagesComponent,
    SettingsComponent,
    AdminComponent,
    AddPageDialogComponent
  ],
  entryComponents: [AddPageDialogComponent]
})
export class AdminModule {}
