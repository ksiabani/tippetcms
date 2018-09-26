import { Injectable } from '@nestjs/common';
import { copySync } from 'fs-extra';
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
}
