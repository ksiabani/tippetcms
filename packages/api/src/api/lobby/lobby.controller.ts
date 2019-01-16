import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { mkdirpSync, copy } from 'fs-extra';
import * as execa from 'execa';
import { GetSitesResponse } from 'shared';

@Controller('lobby')
export class LobbyController {
  constructor() {}

  @Get(':username')
  getSites(@Param('username') username): GetSitesResponse {
    const publicDirToCheck = join(__dirname, '../..', 'public', username);
    const sitesDirToCheck = join(__dirname, '../..', 'sites', username);

    if (existsSync(publicDirToCheck) && existsSync(sitesDirToCheck)) {
      const sites = readdirSync(sitesDirToCheck).filter(dir => dir !== '.keep');
      return { existed: true, created: false, sites };
    }
    mkdirpSync(publicDirToCheck);
    mkdirpSync(sitesDirToCheck);
    return { existed: false, created: true };
  }

  @Post()
  async addSite(@Body()
  body: {
    username: string;
    siteName: string;
    siteTemplate: string;
  }): Promise<{ success: boolean; reason?: any }> {
    const basePath = [__dirname, '../..'];
    const variablePath = [body.username, body.siteName];
    //TODO: should change according to startup chosen by user
    const templateUrl = 'https://github.com/ksiabani/startup-gatsbyjs-template.git';
    const publicDirForSite = join(...basePath, 'public', ...variablePath);
    const sitesDirForSite = join(...basePath, 'sites', ...variablePath);
    try {
      console.log(`Start cloning ${templateUrl} template from GitHub`);
      await execa.shell(`git clone ${templateUrl} ${sitesDirForSite}`);
      // console.log('Clone done, installing dependencies');
      // await execa('npm', ['install'], { cwd: sitesDirForSite });
      console.log(
        `Installing dependencies done, start gatsby build for user ${body.username} and site ${
          body.siteName
        }`,
      );
      await execa('gatsby', ['build', '--prefix-paths'], {
        cwd: sitesDirForSite,
        env: Object.assign({}, process.env, {
          PATH_PREFIX: `/${body.username}/${body.siteName}`,
        }),
      });
      console.log('Build done, start copying site to public folder');
      copy(`${sitesDirForSite}/public`, publicDirForSite);
      console.log('Copy done, have fun with your new site');
      return { success: true };
    } catch (e) {
      console.log('Something went wrong, rolling back');
      await execa.shell(`rm -rf ${sitesDirForSite}`);
      await execa.shell(`rm -rf ${publicDirForSite}`);
      return { success: false, reason: e };
    }
  }

  @Delete(':user/:site')
  async removeSite(
    @Param('user') user: string,
    @Param('site') site: string
  ): Promise<{ success: boolean; reason?: any }> {
    const basePath = [__dirname, '../..'];
    const publicDirForSite = join(...basePath, 'public', user, site);
    const sitesDirForSite = join(...basePath, 'sites', user, site);
    try {
      console.log(`Removing site from sites and public folder`);
      await execa.shell(`rm -rf ${sitesDirForSite}`);
      await execa.shell(`rm -rf ${publicDirForSite}`);
      return { success: true };
    } catch (e) {
      return { success: false, reason: e };
    }
  }
}
