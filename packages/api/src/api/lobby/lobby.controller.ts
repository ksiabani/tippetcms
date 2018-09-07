import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { mkdirpSync } from 'fs-extra';

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
}
