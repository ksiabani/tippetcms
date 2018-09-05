import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LobbyComponent } from "./pages/lobby/lobby.component";
import { LobbyRouting } from "./lobby.routing";
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    LobbyRouting,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  declarations: [LobbyComponent]
})
export class LobbyModule {}
