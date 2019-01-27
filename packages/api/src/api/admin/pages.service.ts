import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import * as shortid from 'shortid';
import * as getSlug from 'speakingurl';
import { Page, PageTemplate, Section, xFile } from 'shared';

@Injectable()
export class PagesService {
  // Get all pages for a site
  getPages(username: string, site: string, path: string): xFile[] {
    const sitePath = join(__dirname, '../..', 'sites', username, site);
    const pagesJsonPath = join(sitePath, 'src', 'data', 'pages.json');
    try {
      const pages: Page[] = JSON.parse(readFileSync(pagesJsonPath, 'utf8'));
      const normalizedPath: string = path !== '0' ? `${'/'}${path.split('-').join('/')}` : '/';
      const requestedPathDepth: number = this.getDepth(normalizedPath);
      return this.getFilesAndFolders(pages, normalizedPath, requestedPathDepth);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  // Get a page
  getSinglePage(username: string, site: string, id: string): any {
    const sitePath = join(__dirname, '../..', 'sites', username, site);
    const pagesJsonPath = join(sitePath, 'src', 'data', 'pages.json');
    try {
      const pages: any[] = JSON.parse(readFileSync(pagesJsonPath, 'utf8'));
      return pages.find(page => page.id === id);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  // Update a page
  savePage(username: string, site: string, id: string, body: { page: Page }) {
    // Get this site's directory
    const sitePath = join(__dirname, '../..', 'sites', username, site);
    // Get directory for this sites's pages.json file
    const pagesJsonPath = join(sitePath, 'src', 'data', 'pages.json');
    try {
      // Read the contents of current pages.json file
      const pages: Page[] = JSON.parse(readFileSync(pagesJsonPath, 'utf8'));
      // Add updated page to existing pages, old page will be overwritten
      const newPages: Page[] = [...pages.filter(page => page.id !== id), body.page];
      // Write updated content back to pages.json file
      writeFileSync(pagesJsonPath, JSON.stringify(newPages), 'utf8');
      // Return the updated object to browser
      return body.page;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  // Create a page
  addPage(
    username: string,
    site: string,
    title: string,
    path: string,
    template: string,
    isIndex: boolean,
  ): Page | void {
    // Get pages.json and site.json files
    const sitePath = join(__dirname, '../..', 'sites', username, site);
    const pagesJsonPath = join(sitePath, 'src', 'data', 'pages.json');
    const siteJsonPath = join(sitePath, 'src', 'data', 'site.json');
    try {
      // Get existing pages
      const pages: Page[] =
        (existsSync(pagesJsonPath) && JSON.parse(readFileSync(pagesJsonPath, 'utf8'))) || [];
      const fullPaths: string[] = (pages && pages.map(page => page.slug)) || [];

      // Get a page from template
      const pageFromTemplate: PageTemplate = JSON.parse(
        readFileSync(siteJsonPath, 'utf8'),
      ).templates.find(page => page && page.name === template);
      const { preview, components } = pageFromTemplate;
      const sections: Section[] = components.map(com => ({ id: shortid.generate(), ...com }));

      // If the page being created is an article, give the title to the article itself
      // and also change the default values
      // TODO: The structure of pages.json/site.json should change to something more flexible to also
      // accommodate this. This should only be a temp solution.
      if (sections.length === 1 && sections[0].name === 'editor') {
        sections[0].data.heading = title;
        sections[0].data.description = 'Some description for your post';
        sections[0].data.html = '';
      }

      // Create a slug. For rules for slug generation, see https://trello.com/c/UuWkeTis
      const slug: string = isIndex
        ? (path.length > 1 && `${path}/`) || '/'
        : `${path}/${getSlug(title)}`;

      // TODO: Validation
      if (fullPaths.includes(slug)) {
        throw new Error('Slug already exists');
      }
      // TODO: Check also if an index page already exists

      // Create new page object
      const page: Page = {
        id: shortid.generate(),
        template,
        title,
        slug,
        preview,
        isIndex,
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

  getSection(username: string, site: string, pageId: string, id: string) {
    const sitePath = join(__dirname, '../..', 'sites', username, site);
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

  // Create a page
  addSection(
    username: string,
    site: string,
    pageId: string,
    title: string,
    description: string,
    template: string,
  ): Page | void {
    // Get pages.json and site.json files
    const sitePath = join(__dirname, '../..', 'sites', username, site);
    const pagesJsonPath = join(sitePath, 'src', 'data', 'pages.json');
    const siteJsonPath = join(sitePath, 'src', 'data', 'site.json');
    try {
      const pages: Page[] = JSON.parse(readFileSync(pagesJsonPath, 'utf8'));
      const page: Page = pages.find(page => page.id === pageId);
      // Get components from page template
      const pageTemplate = JSON.parse(readFileSync(siteJsonPath, 'utf8')).templates.find(
        pageTemplate => pageTemplate && pageTemplate.name === page.template,
      );
      const components = pageTemplate.components;
      // Get section from template and add position
      const section: Section = {
        ...components.find(com => com && com.name === template),
        id: shortid.generate(),
        title,
        description,
        position: page.components.length + 1
      };
      // Prepare new page object
      const newPageObj = {
        ...page,
        components: [
          ...page.components,
          {...section}
        ],
      };
      // Prepare body object
      const body = {
        page: newPageObj,
      };
      // Save page
      this.savePage(username, site, pageId, body);
      // Return the newly created resource
      return newPageObj;
    } catch (e) {
      console.log(e);
      return;
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

  //TODO: Revisit this logic, it should be rewritten since slug logic was changed
  private getFilesAndFolders(
    pages: Page[],
    normalizedPath: string,
    requestedPathDepth: number,
  ): xFile[] {
    let files: xFile[] = [];
    let folders: xFile[] = [];
    pages.forEach(page => {
      // Given -> /some/very/nice/slug/
      // this will return -> /some/very/nice
      const path =
        '/' +
        (page.isIndex
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
        this.getDepth(path) <= requestedPathDepth + 1 &&
        this.matchPathName(path, normalizedPath)
      ) {
        // If page path matches normalized path it is a page
        if (path === normalizedPath) {
          files.push({
            id: page.id,
            folder: false,
            title: page.title,
            // path: path,
            slug: page.slug,
            preview: page.preview,
          });
          return;
        }
        const title = page.slug
          .split('/')
          .filter(el => el)
          .splice(-1, 1)
          .join('');
        // Otherwise its a folder. Only push the folder if its is not already pushed
        if (!folders.find(folder => folder.title === title) && page.isIndex) {
          // Given -> /some/very/nice/blog/
          // this will return -> blog
          folders.push({
            folder: true,
            title,
            path,
          });
        }
      }
    });
    return [...folders, ...files];
  }

}
