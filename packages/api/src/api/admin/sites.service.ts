import { Injectable } from '@nestjs/common';
import { copySync, readFileSync } from 'fs-extra';
import { join } from 'path';
import * as execa from 'execa';
import { Page, PageTemplate, Section, Site, xFile } from 'shared';

@Injectable()
export class SitesService {
  async buildSite(username: string, site: string): Promise<{ success: boolean; reason?: any }> {
    const basePath = [__dirname, '../..'];
    const publicDirForSite = join(...basePath, 'public', username, site);
    const sitesDirForSite = join(...basePath, 'sites', username, site);
    try {
      console.log(`Start gatsby build for user ${username} and site ${site}`);
      await execa('gatsby', ['build', '--prefix-paths'], {
        cwd: sitesDirForSite,
        env: { PATH_PREFIX: `/${username}/${site}` },
      });
      console.log('Gatsby build done, start copy');
      copySync(`${sitesDirForSite}/public`, publicDirForSite);
      console.log('Copy done, have fun with your new site');
      return { success: true };
    } catch (e) {
      return { success: false, reason: e };
    }
  }

  getPageTemplates(username: string, site: string): PageTemplate[] {
    const sitePath = join(__dirname, '../..', 'sites', username, site);
    const siteJsonPath = join(sitePath, 'src', 'data', 'site.json');
    const siteData: Site = JSON.parse(readFileSync(siteJsonPath, 'utf8'));
    return siteData.templates.map(t => ({
      name: t.name,
      title: t.title,
      components: t.components,
    }));
  }

  getFolders(username: string, site: string): xFile[] {
    const sitePath = join(__dirname, '../..', 'sites', username, site);
    const pagesJsonPath = join(sitePath, 'src', 'data', 'pages.json');
    const pages: Page[] = JSON.parse(readFileSync(pagesJsonPath, 'utf8'));
    const folders = [];
    pages.map(page => {
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
      if (!folders.find(folder => folder.title === path) && path !== '/') {
        folders.push({ title: path });
      }
    });
    return folders;
  }

  getSectionTemplates(username: string, site: string, pageId: string): Section[] {
    const sitePath = join(__dirname, '../..', 'sites', username, site);
    const pagesJsonPath = join(sitePath, 'src', 'data', 'pages.json');
    const siteJsonPath = join(sitePath, 'src', 'data', 'site.json');
    const siteData: Site = JSON.parse(readFileSync(siteJsonPath, 'utf8'));
    const pages: Page[] = JSON.parse(readFileSync(pagesJsonPath, 'utf8'));
    const template: string = pages.find(page => page.id === pageId).template;
    // Return components with data
    return (
      siteData.templates.find(t => t.name === template).components.filter(com => com.data) || []
    );
  }

  getRemoteRepo(username: string, site: string): { remote: string } {
    const sitePath = join(__dirname, '../..', 'sites', username, site);
    const siteJsonPath = join(sitePath, 'src', 'data', 'site.json');
    const siteData: Site = JSON.parse(readFileSync(siteJsonPath, 'utf8'));
    const remote = siteData.remote || null;
    return { remote };
  }

  async publishSite(
    username: string,
    site: string,
    remote: string,
  ): Promise<{ success: boolean; reason?: any }> {
    try {
      const basePath = [__dirname, '../..'];
      const publicDirForSite = join(...basePath, 'public', username, site);
      // Get site data from site.json
      const sitePath = join(__dirname, '../..', 'sites', username, site);
      const siteJsonPath = join(sitePath, 'src', 'data', 'site.json');
      const siteData: Site = JSON.parse(readFileSync(siteJsonPath, 'utf8'));
      console.log(`(Re)initialize git for user ${username} and site ${site}`);
      await execa('git', ['init'], {
        cwd: publicDirForSite
      });
      // TODO: If everything ends fine, write repo to site.json
      return { success: true };
    } catch (e) {
      return { success: false, reason: e };
    }
  }
}
