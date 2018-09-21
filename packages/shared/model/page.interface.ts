export interface Section {
  id: string;
  name: string;
  alias: string;
  icon: string;
  description: string;
  preview: string;
  position: number;
  data: Data;
  dependencies?: Tile[]
}

export interface Tile {
  name: string;
  data: Data[];
}

export interface Data {
  [key: string]: string;
}

export interface Page {
  id: string;
  name: string;
  path: string;
  slug: string;
  template: string;
  preview: string;
  components: Section[];
}
