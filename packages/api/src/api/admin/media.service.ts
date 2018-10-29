import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { writeFileSync, unlinkSync, readdirSync } from 'fs';

@Injectable()
export class MediaService {
  listMedia(username: string, site: string) {
    try {
      const publicPath = join(__dirname, '../..', 'public', username, site);
      const mediaPath = join(publicPath, 'images');
      return readdirSync(mediaPath);
    } catch (e) {
      return { success: false, reason: e };
    }
  }

  uploadMedia(username: string, site: string, file) {
    try {
      const publicPath = join(__dirname, '../..', 'public', username, site);
      const sitePath = join(__dirname, '../..', 'sites', username, site);
      const publicMediaPath = join(publicPath, 'images', file.originalname);
      const siteMediaPath = join(sitePath, 'static', 'images', file.originalname);
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
      const publicMediaPath = join(publicPath, 'images', mediaName);
      const siteMediaPath = join(sitePath, 'static', 'images', mediaName);
      unlinkSync(publicMediaPath);
      unlinkSync(siteMediaPath);
      return { success: true };
    } catch (e) {
      return { success: false, reason: e };
    }
  }
}
