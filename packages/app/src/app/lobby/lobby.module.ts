import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LobbyComponent } from "./pages/lobby/lobby.component";
import { LobbyRouting } from "./lobby.routing";

@NgModule({
  imports: [CommonModule, LobbyRouting],
  declarations: [LobbyComponent]
})
export class LobbyModule {}
