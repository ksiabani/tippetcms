export class GetPages {
  static readonly type = "[Admin] Get Pages";
  constructor(private username: string, private site: string, private path: string) {}
}

export class ChangePath {
  static readonly type = "[Admin] Change Path";
  constructor(private path: string[]) {}
}
