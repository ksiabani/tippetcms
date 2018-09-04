export class Login {
  static readonly type = "[Login] Login";
}

export class Logout {
  static readonly type = "[Login] Logout";
}

export class SetUser {
  static readonly type = "[Login] Set User";
  constructor(public user: firebase.User) {}
}
