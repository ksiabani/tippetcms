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
    // https://firebase.google.com/docs/auth/web/github-auth
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope("repo");
    return this.afAuth.auth.signInWithPopup(provider);
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
    return this.http
      .get<any>(`https://api.github.com/user/repos?page=1&per_page=100`)
      .toPromise();
  }

  getRepo(owner, repo): Promise<any> {
    return this.http
      .get<any>(`https://api.github.com/repos/${owner}/${repo}`)
      .toPromise();
  }

  createRepo(user, repo): Promise<any> {
    const body = {
      name: repo,
      description: "Made with <3 with TippetCMS",
      homepage: `https://${user}.github.io/${repo}`,
      private: false,
      has_issues: true,
      has_projects: true,
      has_wiki: true
    };
    return this.http
      .post<any>(`https://api.github.com/user/repos`, body)
      .toPromise();
  }
}
