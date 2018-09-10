import { Controller, Get, HttpCode, Param, Post, Body } from '@nestjs/common';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { mkdirpSync, copy } from 'fs-extra';
import * as execa from 'execa';

@Controller('lobby')
export class LobbyController {
  constructor() {}

  @Get(':username')
  getSites(
    @Param('username') username,
  ): { existed: boolean; created: boolean; sites?: string[] } {
    const publicDirToCheck = join(__dirname, '../..', 'public', username);
    const gutsbiesDirToCheck = join(__dirname, '../..', 'gutsbies', username);

    if (existsSync(publicDirToCheck) && existsSync(gutsbiesDirToCheck)) {
      const sites = readdirSync(gutsbiesDirToCheck).filter(
        dir => dir !== '.keep',
      );
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
  }) {
    const basePath = [__dirname, '../..'];
    const variablePath = [body.username, body.siteName];
    //should change acording to startup chosen by user
    const templateUrl =
      'https://github.com/thesquaredev/startup-gatsbyjs-template.git';
    const publicDirForSite = join(...basePath, 'public', ...variablePath);
    const gutsbiesDirForSite = join(...basePath, 'gutsbies', ...variablePath);

    // some error controll will be needed here
    await execa.shell(`git clone ${templateUrl} ${gutsbiesDirForSite}`);
    console.log('gitclone done');
    await execa('npm', ['install'], { cwd: gutsbiesDirForSite });
    console.log('npm i done');
    await execa('gatsby', ['build'], { cwd: gutsbiesDirForSite });
    console.log('npm  build done');
    copy(`${gutsbiesDirForSite}/public`, publicDirForSite);
    console.log('copy done');

    return { success: true };
  }
}
