import { Injectable } from "@angular/core";
import { auth } from "firebase";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable({
  providedIn: "root"
})
export class GithubService {
  constructor(public afAuth: AngularFireAuth) {}

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
