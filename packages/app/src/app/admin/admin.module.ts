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
  MatMenuModule,
  MatAutocompleteModule,
  MatExpansionModule
} from "@angular/material";
import { DragulaModule } from "ng2-dragula";
import { DetailsComponent } from "./pages/details/details.component";
import { SectionComponent } from "./pages/section/section.component";
import { TileComponent } from "./pages/tile/tile.component";

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
    MatMenuModule,
    MatAutocompleteModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    DragulaModule.forRoot()
  ],
  declarations: [
    OverviewComponent,
    ElementsComponent,
    MediaComponent,
    PagesComponent,
    SettingsComponent,
    AdminComponent,
    AddPageDialogComponent,
    DetailsComponent,
    SectionComponent,
    TileComponent
  ],
  entryComponents: [AddPageDialogComponent]
})
export class AdminModule {}
