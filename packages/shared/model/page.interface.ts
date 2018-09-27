export interface Section {
  id?: string;
  name: string;
  title: string;
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
  title: string;
  path: string;
  slug: string;
  template: string;
  preview: string;
  components: Section[];
}

export interface PageTemplate {
  name: string;
  title: string;
  preview: string;
  components: Section[];
}
