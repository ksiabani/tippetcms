import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  Post,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { PagesService, TippetFile } from './pages.service';
import { MediaService } from './media.service';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as execa from 'execa';
import { copySync } from 'fs-extra';
import { Page } from 'shared/model/page.interface';
import { SitesService } from './sites.service';

interface File {
  id?: number;
  folder: boolean;
  name: string;
  path: string;
  slug?: string;
  preview?: string;
}

@Controller('admin')
export class AdminController {
  constructor(
    private pagesService: PagesService,
    private mediaService: MediaService,
    private siteService: SitesService,
  ) {}

  // Get pages
  @Get('pages/:username/:site/:path')
  getPages(
    @Param('username') username: string,
    @Param('site') site: string,
    @Param('path') path: string,
  ): TippetFile[] {
    return this.pagesService.getPages(username, site, path);
  }

  // Get a page
  @Get('page/:username/:site/:id')
  getSinglePage(
    @Param('username') username: string,
    @Param('site') site: string,
    @Param('id') id: string,
  ): any {
    return this.pagesService.getSinglePage(username, site, id);
  }

  // Get a sites media
  @Get('media/:username/:site')
  getMedia(@Param('username') username: string, @Param('site') site: string): any {
    return this.mediaService.listMedia(username, site);
  }

  // Upload media
  @Post('media/:username/:site')
  @UseInterceptors(FileInterceptor('file'))
  uploadMedia(
    @Param('username') username: string,
    @Param('site') site: string,
    @UploadedFile() file,
  ) {
    return this.mediaService.uploadMedia(username, site, file);
  }

  // Remove media
  @Delete('media/:username/:site/:mediaName')
  removeMedia(
    @Param('username') username: string,
    @Param('site') site: string,
    @Param('mediaName') mediaName: string,
  ) {
    return this.mediaService.removeMedia(username, site, mediaName);
  }

  // Update a page
  @Put('page/:username/:site/:id')
  savePage(
    @Param('username') username: string,
    @Param('site') site: string,
    @Param('id') id: string,
    @Body() body: { page: Page },
  ): Page {
    return this.pagesService.savePage(username, site, id, body);
  }

  // Get a section
  @Get('page/:username/:site/:pageId/:id')
  getSection(
    @Param('username') username: string,
    @Param('site') site: string,
    @Param('pageId') pageId: string,
    @Param('id') id: string,
  ): any {
    return this.pagesService.getSection(username, site, pageId, id);
  }

  // Build a site
  @Put('sites/:username/:site')
  async buildSite(
    @Param('username') username: string,
    @Param('site') site: string,
  ): Promise<{ success: boolean; reason?: any }> {
    return this.siteService.buildSite(username, site);
  }

  // Build a site
  @Get('sites/:username/:site')
  getTemplates(
    @Param('username') username: string,
    @Param('site') site: string,
  ): { name: string }[] {
    return this.siteService.getTemplates(username, site);
  }

  // Build a site
  @Get('sites/:username/:site/:templateId')
  getSections(
    @Param('username') username: string,
    @Param('site') site: string,
    @Param('templateId') templateId: string,
  ): { id: string; name: string }[] {
    return this.siteService.getSections(username, site, templateId);
  }
}
