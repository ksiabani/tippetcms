import { Injectable } from '@nestjs/common';
import { copySync, readFileSync } from 'fs-extra';
import { join } from 'path';
import * as execa from 'execa';
import { Page, PageTemplate, Section, Site } from 'shared';

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

  getSectionTemplates(
    username: string,
    site: string,
    pageId: string,
  ): Section[] {
    const sitePath = join(__dirname, '../..', 'sites', username, site);
    const pagesJsonPath = join(sitePath, 'src', 'data', 'pages.json');
    const siteJsonPath = join(sitePath, 'src', 'data', 'site.json');
    const siteData: Site = JSON.parse(readFileSync(siteJsonPath, 'utf8'));
    const pages: Page[] = JSON.parse(readFileSync(pagesJsonPath, 'utf8'));
    const template: string = pages.find(page => page.id === pageId).template;
    return siteData.templates.find(t => t.name === template).components || [];
  }
}
