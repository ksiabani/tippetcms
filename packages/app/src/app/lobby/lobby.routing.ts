import { Routes, RouterModule } from "@angular/router";
import { LobbyComponent } from "./pages/lobby/lobby.component";

const lobbyRoutes: Routes = [{ path: "lobby", component: LobbyComponent }];

export const LobbyRouting = RouterModule.forChild(lobbyRoutes);
