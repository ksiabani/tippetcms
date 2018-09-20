import { GithubUser } from "shared";

export interface User extends firebase.User {
  githubUser: GithubUser;
}
