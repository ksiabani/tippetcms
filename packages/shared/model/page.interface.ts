export interface Section {
  id?: string;
  name: string;
  title: string;
  description: string;
  preview: string;
  position: number;
  icon: string;
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
  template: string;
  title: string;
  isIndex?: boolean;
  slug: string;
  preview: string;
  components: Section[];
}

export interface PageTemplate {
  name: string;
  title: string;
  isIndex?: boolean;
  preview?: string;
  components: Section[];
}

export interface Site {
  title: string;
  templates: PageTemplate[]
}
