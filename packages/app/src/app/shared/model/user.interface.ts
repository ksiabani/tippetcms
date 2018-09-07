import { GithubUser } from "./github-user.interface";

export interface User extends firebase.User {
  githubUser: GithubUser;
}
