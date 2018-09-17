import { Controller, Get, HttpCode, Param, Post, Body } from '@nestjs/common';
import { readdirSync, existsSync, unlinkSync, readFileSync } from 'fs';
import { join } from 'path';

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
