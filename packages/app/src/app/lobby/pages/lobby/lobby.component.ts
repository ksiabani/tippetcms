import { Component, OnInit } from '@angular/core';
import { Select } from "@ngxs/store";
import { Store } from "@ngxs/store";
import { LoginState } from "../../../login/store/login.state";
import { Observable } from "rxjs";
import { Logout } from "../../../login/store/login.actions";
import { MatDialog } from "@angular/material";
import { AddProjectDialogComponent } from "../add-project-dialog/add-project-dialog.component";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  @Select(LoginState.user)
  user: Observable<firebase.User>;

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(Logout);
  }

  openDialog(): void {
    this.dialog.open(AddProjectDialogComponent, {
      disableClose: true,
      panelClass: 'add-project-dialog'
    });
  }
}
