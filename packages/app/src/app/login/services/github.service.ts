import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import { HttpClient } from "@angular/common/http";
import { GithubUser } from "shared";

@Injectable({
  providedIn: "root"
})
export class GithubService {
  constructor(public afAuth: AngularFireAuth, private http: HttpClient) {}

  login() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GithubAuthProvider()
    );
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  getUserInfo(id: string): Promise<GithubUser> {
    return this.http
      .get<GithubUser>(`https://api.github.com/user/${id}`)
      .toPromise();
  }

  getRepos(): Promise<any> {
    return this.http.get<any>(`https://api.github.com/user/repos`).toPromise();
  }
}
