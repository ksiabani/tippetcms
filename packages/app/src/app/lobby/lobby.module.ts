import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LobbyComponent } from "./pages/lobby/lobby.component";
import { LobbyRouting } from "./lobby.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from "@angular/material";
import { AddProjectDialogComponent } from "./components/add-project-dialog/add-project-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    LobbyRouting,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [LobbyComponent, AddProjectDialogComponent],
  entryComponents: [AddProjectDialogComponent]
})
export class LobbyModule {}
