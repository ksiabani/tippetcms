import { Injectable } from '@nestjs/common';
import { copySync, readFileSync } from 'fs-extra';
import { join } from 'path';
import * as execa from 'execa';

@Injectable()
export class SitesService {
  async buildSite(username: string, site: string): Promise<{ success: boolean; reason?: any }> {
    const basePath = [__dirname, '../..'];
    const publicDirForSite = join(...basePath, 'public', username, site);
    const sitesDirForSite = join(...basePath, 'sites', username, site);
    try {
      console.log(`Start gatsby build for user ${username} and site ${site}`);
      // TODO: Confirm it works in OSX and remove the other cases
      // Case 1
      await execa('gatsby', ['build', '--prefix-paths'], {
        cwd: sitesDirForSite,
        env: { PATH_PREFIX: `/${username}/${site}` }
      });
      // Case 2
      // await execa('gatsby', ['build', '--prefix-paths'], {
      //   cwd: sitesDirForSite,
      //   env: Object.assign({}, process.env, {
      //     env: { PATH_PREFIX: `/${username}/${site}` },
      //   })
      // });
      // Case 3
      // await execa('gatsby', ['build'], { cwd: sitesDirForSite });
      console.log('Gatsby build done, start copy');
      copySync(`${sitesDirForSite}/public`, publicDirForSite);
      console.log('Copy done');
      return { success: true };
    } catch (e) {
      return { success: false, reason: e };
    }
  }

  getPageTemplates(username: string, site: string): { name: string }[] {
    const sitePath = join(__dirname, '../..', 'sites', username, site);
    const siteJsonPath = join(sitePath, 'src', 'data', 'site.json');
    const siteData: any = JSON.parse(readFileSync(siteJsonPath, 'utf8'));
    return siteData.templates.map(t => ({ name: t.name }));
  }

  getSectionTemplates(
    username: string,
    site: string,
    templateId: string,
  ): { id: string; name: string }[] {
    const sitePath = join(__dirname, '../..', 'sites', username, site);
    const siteJsonPath = join(sitePath, 'src', 'data', 'site.json');
    const siteData: any = JSON.parse(readFileSync(siteJsonPath, 'utf8'));
    const template = siteData.templates.find(t => t.id === templateId);
    return (template && template.components.map(t => ({ id: t.id, name: t.name }))) || [];
  }
}
