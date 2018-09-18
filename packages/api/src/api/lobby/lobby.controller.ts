import { Controller, Get, HttpCode, Param, Post, Body } from '@nestjs/common';
import { readdirSync, existsSync, unlinkSync } from 'fs';
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
    const gutsbiesDirToCheck = join(__dirname, '../..', 'gutsbies', username);

    if (existsSync(publicDirToCheck) && existsSync(gutsbiesDirToCheck)) {
      const sites = readdirSync(gutsbiesDirToCheck).filter(dir => dir !== '.keep');
      return { existed: true, created: false, sites };
    }
    mkdirpSync(publicDirToCheck);
    mkdirpSync(gutsbiesDirToCheck);
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
    //should change acording to startup chosen by user
    const templateUrl = 'https://github.com/thesquaredev/startup-gatsbyjs-template.git';
    const publicDirForSite = join(...basePath, 'public', ...variablePath);
    const gutsbiesDirForSite = join(...basePath, 'gutsbies', ...variablePath);

    try {
      await execa.shell(`git clone ${templateUrl} ${gutsbiesDirForSite}`);
      console.log('gitclone done');
      await execa('npm', ['install'], { cwd: gutsbiesDirForSite });
      console.log('npm i done');
      await execa('gatsby', ['build'], { cwd: gutsbiesDirForSite });
      console.log('npm  build done');
      copy(`${gutsbiesDirForSite}/public`, publicDirForSite);
      console.log('copy done');

      return { success: true };
    } catch (e) {
      await execa.shell(`rm -rf ${gutsbiesDirForSite}`);
      await execa.shell(`rm -rf ${publicDirForSite}`);

      return { success: false, reason: e };
    }
  }

  @Post()
  async buildSite(@Body() body: { username: string; siteName: string }): Promise<{
    success: boolean;
    reason?: any;
  }> {
    const basePath = [__dirname, '../..'];
    const variablePath = [body.username, body.siteName];
    const publicDirForSite = join(...basePath, 'public', ...variablePath);
    const gutsbiesDirForSite = join(...basePath, 'gutsbies', ...variablePath);

    try {
      await execa('gatsby', ['build'], { cwd: gutsbiesDirForSite });
      copy(`${gutsbiesDirForSite}/public`, publicDirForSite);

      return { success: true };
    } catch (e) {
      return { success: false, reason: e };
    }
  }
}
