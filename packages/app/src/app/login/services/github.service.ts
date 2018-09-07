import { Injectable } from "@angular/core";
import { auth } from "firebase";
import { AngularFireAuth } from "angularfire2/auth";
import { HttpClient } from "@angular/common/http";
import { GithubUser } from "../../shared/model/github-user.interface";

@Injectable({
  providedIn: "root"
})
export class GithubService {
  constructor(public afAuth: AngularFireAuth, private http: HttpClient) {}

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getUserInfo(id: string): Promise<GithubUser> {
    // Primisify because needs to be awaited
    return this.http.get<GithubUser>(`https://api.github.com/user/${id}`).toPromise();
  }
}
