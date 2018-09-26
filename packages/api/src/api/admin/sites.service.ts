import { Injectable } from '@nestjs/common';
import { copySync, readFileSync } from 'fs-extra';
import { join } from 'path';
import * as execa from 'execa';

@Injectable()
export class SitesService {
  async buildSite(username: string, site: string): Promise<{ success: boolean; reason?: any }> {
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

  getPageTemplates(username: string, site: string): { name: string }[] {
    const sitePath = join(__dirname, '../..', 'gutsbies', username, site);
    const siteJsonPath = join(sitePath, 'src', 'data', 'site.json');
    const siteData: any = JSON.parse(readFileSync(siteJsonPath, 'utf8'));
    return siteData.templates.map(t => ({ name: t.name }));
  }

  getSectionTemplates(username: string, site: string, templateId: string): { id: string; name: string }[] {
    const sitePath = join(__dirname, '../..', 'gutsbies', username, site);
    const siteJsonPath = join(sitePath, 'src', 'data', 'site.json');
    const siteData: any = JSON.parse(readFileSync(siteJsonPath, 'utf8'));
    const template = siteData.templates.find(t => t.id === templateId);
    return (template && template.components.map(t => ({ id: t.id, name: t.name }))) || [];
  }
}
