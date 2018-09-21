export class GetPages {
  static readonly type = "[Admin] [Pages] Get Pages";
  constructor(private username: string, private site: string, private path: string) {}
}

export class ChangePath {
  static readonly type = "[Admin] [Pages] Change Path";
  constructor(private path: string[]) {}
}

export class GetSinglePage {
  static readonly type = "[Admin] [Page] Get Single Page";
  constructor(private username: string, private site: string, private id: string) {}
}

export class BuildSite {
  static readonly type = "[Admin] Build Site";
  constructor(private username: string, private site: string) {}
}

export class GetMedia {
  static readonly type = "[Admin] [Media] Get Media";
  constructor(private username: string, private site: string) {}
}

export class RemoveMedia {
  static readonly type = "[Admin] [Media] Remove Media";
  constructor(private username: string, private site: string, private mediaName: string) {}
}
