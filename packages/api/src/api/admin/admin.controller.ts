import { Body, Controller, Get, Param, Put, Post, Patch } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as execa from 'execa';
import { copySync } from 'fs-extra';
import { Page } from 'shared/model/page.interface';

interface File {
  id?: number;
  folder: boolean;
  name: string;
  path: string;
  slug?: string;
  preview?: string;
}

@Controller('admin')
export class AdminController {
  constructor() {}

  // Get pages
  @Get('pages/:username/:site/:path')
  getPages(
    @Param('username') username: string,
    @Param('site') site: string,
    @Param('path') path: string,
  ): File[] {
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

  // Get a page
  @Get('page/:username/:site/:id')
  getSinglePage(
    @Param('username') username: string,
    @Param('site') site: string,
    @Param('id') id: string,
  ): any {
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

  // Update a page
  @Put('page/:username/:site/:id')
  updateSection(
    @Param('username') username: string,
    @Param('site') site: string,
    @Param('id') id: string,
    @Body()
    body: {
      page: Page;
    },
  ): any {
    const sitePath = join(__dirname, '../..', 'gutsbies', username, site);
    const pagesJsonPath = join(sitePath, 'src', 'data', 'pages.json');
    try {
      const pages: any[] = JSON.parse(readFileSync(pagesJsonPath, 'utf8'));
      const newPages = [...pages.filter(page => page.id !== id), body.page];
      writeFileSync(pagesJsonPath, JSON.stringify(newPages), 'utf8');
      return body.page;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  // Get a section
  @Get('page/:username/:site/:pageId/:id')
  getSection(
    @Param('username') username: string,
    @Param('site') site: string,
    @Param('pageId') pageId: string,
    @Param('id') id: string,
  ): any {
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

  // Build a site
  @Put('sites/:username/:site')
  async buildSite(
    @Param('username') username: string,
    @Param('site') site: string,
  ): Promise<{ success: boolean; reason?: any }> {
    const basePath = [__dirname, '../..'];
    const publicDirForSite = join(...basePath, 'public', username, site);
    const gutsbiesDirForSite = join(...basePath, 'gutsbies', username, site);
    try {
      console.log(`Start gatsby build for user ${username} and site ${site}`);
      await execa('gatsby', ['build', '--prefix-paths'], { cwd: gutsbiesDirForSite });
      console.log('Gatsby build done, start copy');
      copySync(`${gutsbiesDirForSite}/public`, publicDirForSite);
      console.log('Copy done');
      return { success: true };
    } catch (e) {
      await execa.shell(`rm -rf ${gutsbiesDirForSite}`);
      await execa.shell(`rm -rf ${publicDirForSite}`);
      return { success: false, reason: e };
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
  ): File[] {
    let files: File[] = [];
    let folders: File[] = [];

    pages.forEach(page => {
      if (
        this.getDepth(page.path) >= requestedPathDepth &&
        this.getDepth(page.path) <= requestedPathDepth + 1 &&
        this.matchPathName(page.path, normalizedPath)
      ) {
        // If page path matches normalized path it is a page
        if (page.path === normalizedPath) {
          files.push({
            id: page.id,
            folder: false,
            name: page.name,
            path: page.path,
            slug: page.slug,
            preview: page.preview,
          });
          return;
        }
        // Otherwise its a folders. Only push the folder if its is not already pushed
        if (!folders.find(folder => folder.path === page.path)) {
          folders.push({ folder: true, name: page.path.split('/').pop(), path: page.path });
        }
      }
    });

    return [...folders, ...files];
  }
}
