import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { writeFileSync, unlinkSync, readdirSync } from 'fs';

@Injectable()
export class MediaService {
  listMedia(username: string, site: string) {
    try {
      const publicPath = join(__dirname, '../..', 'public', username, site);
      const mediaPath = join(publicPath, 'img');
      return readdirSync(mediaPath);
    } catch (e) {
      return { success: false, reason: e };
    }
  }

  uploadMedia(username: string, site: string, file) {
    try {
      const publicPath = join(__dirname, '../..', 'public', username, site);
      const sitePath = join(__dirname, '../..', 'sites', username, site);
      const publicMediaPath = join(publicPath, 'img', file.originalname);
      const siteMediaPath = join(sitePath, 'static', 'img', file.originalname);
      writeFileSync(publicMediaPath, file.buffer);
      writeFileSync(siteMediaPath, file.buffer);
      return { success: true, utl: join(username, site, file.originalname) };
    } catch (e) {
      return { success: false, reason: e };
    }
  }

  removeMedia(username: string, site: string, mediaName: string) {
    try {
      const publicPath = join(__dirname, '../..', 'public', username, site);
      const sitePath = join(__dirname, '../..', 'sites', username, site);
      const publicMediaPath = join(publicPath, 'img', mediaName);
      const siteMediaPath = join(sitePath, 'static', 'img', mediaName);
      unlinkSync(publicMediaPath);
      unlinkSync(siteMediaPath);
      return { success: true };
    } catch (e) {
      return { success: false, reason: e };
    }
  }
}
