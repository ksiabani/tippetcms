import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { writeFileSync, unlinkSync, readdirSync } from 'fs';

@Injectable()
export class MediaService {
  listMedia(username: string, site: string) {
    try {
      const sitePath = join(__dirname, '../..', 'public', username, site);
      const mediaPath = join(sitePath, 'img');
      return readdirSync(mediaPath);
    } catch (e) {
      return { success: false, reason: e };
    }
  }

  uploadMedia(username: string, site: string, file) {
    try {
      const sitePath = join(__dirname, '../..', 'public', username, site);
      const gatsbyPath = join(__dirname, '../..', 'gutsbies', username, site);
      const publicMediaPath = join(sitePath, 'img', file.originalname);
      const gutsbyMediaPath = join(gatsbyPath, 'static', 'img', file.originalname);
      writeFileSync(publicMediaPath, file.buffer);
      writeFileSync(gutsbyMediaPath, file.buffer);
      return { success: true, utl: join(username, site, file.originalname) };
    } catch (e) {
      return { success: false, reason: e };
    }
  }

  removeMedia(username: string, site: string, mediaName: string) {
    try {
      const sitePath = join(__dirname, '../..', 'public', username, site);
      const gatsbyPath = join(__dirname, '../..', 'gutsbies', username, site);
      const publicMediaPath = join(sitePath, 'img', mediaName);
      const gutsbyMediaPath = join(gatsbyPath, 'static', 'img', mediaName);
      unlinkSync(publicMediaPath);
      unlinkSync(gutsbyMediaPath);
      return { success: true };
    } catch (e) {
      return { success: false, reason: e };
    }
  }
}
