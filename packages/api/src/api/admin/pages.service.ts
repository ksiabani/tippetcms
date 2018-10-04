import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import * as shortid from 'shortid';
import * as getSlug from 'speakingurl';
import { Page, PageTemplate, Section } from 'shared';

// TODO: Replace this
export interface TippetFile {
  id?: number;
  folder: boolean;
  title: string;
  path: string;
  slug?: string;
  preview?: string;
}

@Injectable()
export class PagesService {
  getPages(username: string, site: string, path: string): TippetFile[] {
    const sitePath = join(__dirname, '../..', 'gutsbies', username, site);
    const pagesJsonPath = join(sitePath, 'src', 'data', 'pages.json');
    try {
      const pages: any[] = JSON.parse(readFileSync(pagesJsonPath, 'utf8'));
      const normalizedPath: string = path !== '0' ? `${'/'}${path.split('-').join('/')}` : '/';
      const requestedPathDepth: number = this.getDepth(normalizedPath);
      return this.getFilesAndFolders(pages, normalizedPath, requestedPathDepth);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  getSinglePage(username: string, site: string, id: string): any {
    const sitePath = join(__dirname, '../..', 'gutsbies', username, site);
    const pagesJsonPath = join(sitePath, 'src', 'data', 'pages.json');
    try {
      const pages: any[] = JSON.parse(readFileSync(pagesJsonPath, 'utf8'));
      return pages.find(page => page.id === id);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  savePage(username: string, site: string, id: string, body: { page: Page }) {
    const sitePath = join(__dirname, '../..', 'gutsbies', username, site);
    const pagesJsonPath = join(sitePath, 'src', 'data', 'pages.json');
    try {
      const pages: any[] = JSON.parse(readFileSync(pagesJsonPath, 'utf8'));
      const newPages = [...pages.filter(page => page.id !== id), body.page];
      writeFileSync(pagesJsonPath, JSON.stringify(newPages), 'utf8');
      return body.page;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  getSection(username: string, site: string, pageId: string, id: string) {
    const sitePath = join(__dirname, '../..', 'gutsbies', username, site);
    const pagesJsonPath = join(sitePath, 'src', 'data', 'pages.json');
    try {
      const pages: any[] = JSON.parse(readFileSync(pagesJsonPath, 'utf8'));
      return pages
        .find(page => page.id === pageId)
        .components.filter(component => component.id === id);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  private getDepth(path: string): number {
    if (path === '/') return 0;
    return path.substring(1).split('/').length;
  }

  private matchPathName(path: string, normalizedPath: string): boolean {
    if (normalizedPath === '0') return true;
    return (
      path.substring(0, normalizedPath.length) === normalizedPath ||
      path.substring(0, normalizedPath.length + 1) === `${normalizedPath}/`
    );
  }

  private getFilesAndFolders(
    pages: any[],
    normalizedPath: string,
    requestedPathDepth: number,
  ): TippetFile[] {
    let files: TippetFile[] = [];
    let folders: TippetFile[] = [];
    pages.forEach(page => {
      // Given -> /some/very/nice/slug/
      // this will return -> /some/very/nice
      const path = "/" +  (page.isIndex
        ? page.slug
          .split('/')
          .filter(el => el)
          .join('/')
        : page.slug
          .split('/')
          .filter(el => el)
          .slice(0, -1)
          .join('/'));
      if (
        this.getDepth(path) >= requestedPathDepth &&
        this.getDepth(path) <= requestedPathDepth + 2 &&
        this.matchPathName(path, normalizedPath)
      ) {
        // If page path matches normalized path it is a page
        if (path === normalizedPath) {
          files.push({
            id: page.id,
            folder: false,
            title: page.title,
            path: path,
            slug: page.slug,
            preview: page.preview,
          });
          return;
        }
        // Otherwise its a folder. Only push the folder if its is not already pushed
        if (!folders.find(folder => folder.path === path)) {
          // Given -> /some/very/nice/blog/
          // this will return -> blog
          const title =  page.slug
              .split('/')
              .filter(el => el)
              .splice(-1, 1)
              .join('');
          folders.push({ folder: true, title, path });
        }
      }
    });
    return [...folders, ...files];
  }

  // TODO: Slug name must be changed below
  // Create a page
  addPage(
    username: string,
    site: string,
    title: string,
    path: string,
    template: string,
  ): Page | void {
    //TODO: Implement isIndex
    const isIndex = true;
    // Get pages.json and site.json files
    const sitePath = join(__dirname, '../..', 'gutsbies', username, site);
    const pagesJsonPath = join(sitePath, 'src', 'data', 'pages.json');
    const siteJsonPath = join(sitePath, 'src', 'data', 'site.json');
    try {
      // Get existing pages
      const pages: Page[] =
        (existsSync(pagesJsonPath) && JSON.parse(readFileSync(pagesJsonPath, 'utf8'))) || [];
      const fullPaths: string[] =
        (pages &&
          pages.map(
            // page => (page.path === '/' ? `/${page.slug}` : `${page.path}/${page.slug}`)
            page => page.slug,
          )) ||
        [];

      // Get a page from template
      const pageFromTemplate: PageTemplate = JSON.parse(
        readFileSync(siteJsonPath, 'utf8'),
      ).templates.find(page => page && page.name === template);
      const { preview, components } = pageFromTemplate;
      const sections: Section[] = components.map(com => ({ id: shortid.generate(), ...com }));

      // Create a slug. For rules for slug generation, see https://trello.com/c/UuWkeTis
      const slug: string = isIndex ? (path.length > 1 && `${path}/`) || '/' : getSlug(title);

      // TODO: Validation
      if (fullPaths.includes(slug)) {
        throw new Error('Slug already exists');
      }

      // Create new page object
      const page: Page = {
        id: shortid.generate(),
        template,
        title,
        slug,
        preview,
        components: sections,
      };

      // Write new page to pages.json
      writeFileSync(pagesJsonPath, JSON.stringify([...pages, page]), 'utf8');

      // Return the newly created resource
      return page;
    } catch (e) {
      console.log(e);
      return;
    }
  }
}
