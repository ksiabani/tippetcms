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
import { DropzoneModule, DropzoneConfigInterface, DROPZONE_CONFIG } from "ngx-dropzone-wrapper";
import { MediaLibraryComponent } from './components/media-library/media-library.component';
import { SortPipe } from "../shared/pipes/sort/sort.pipe";
import { QuillModule } from "ngx-quill";

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 1,
  acceptedFiles: "image/*"
};

@NgModule({
  imports: [
    CommonModule,
    DropzoneModule,
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
    DragulaModule.forRoot(),
    QuillModule
  ],
  exports: [SortPipe],
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
    TileComponent,
    MediaLibraryComponent,
    SortPipe
  ],
  entryComponents: [AddPageDialogComponent],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class AdminModule {}
