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
import { PagesService } from './pages.service';
import { MediaService } from './media.service';
import { Page, PageTemplate, Section } from 'shared/model/page.interface';
import { SitesService } from './sites.service';
import { xFile } from 'shared';

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
  ): xFile[] {
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

  // Create a page
  @Post('page/:username/:site')
  addPage(
    @Param('username') username: string,
    @Param('site') site: string,
    @Body()
    body: {
      title: string;
      path: string;
      template: string;
      isIndex: boolean;
    },
  ): Page | void {
    return this.pagesService.addPage(
      username,
      site,
      body.title,
      body.path,
      body.template,
      body.isIndex,
    );
  }

  // Create a section
  @Post('page/:username/:site/:pageId/section')
  addSection(
    @Param('username') username: string,
    @Param('site') site: string,
    @Param('pageId') pageId: string,
    @Body()
    body: {
      title: string;
      description: string;
      template: string;
    },
  ): Page | void {
    return this.pagesService.addSection(
      username,
      site,
      pageId,
      body.title,
      body.description,
      body.template,
    );
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
    return this.siteService.buildSite(username, site, false);
  }

  // Get page templates
  @Get('sites/:username/:site/templates')
  getPageTemplates(
    @Param('username') username: string,
    @Param('site') site: string,
  ): PageTemplate[] {
    return this.siteService.getPageTemplates(username, site);
  }

  // Get folders
  @Get('sites/:username/:site/folders')
  getFolders(@Param('username') username: string, @Param('site') site: string): xFile[] {
    return this.siteService.getFolders(username, site);
  }

  // Get sections per template
  @Get('sites/:username/:site/:pageId/sections')
  getSectionTemplates(
    @Param('username') username: string,
    @Param('site') site: string,
    @Param('pageId') pageId: string,
  ): Section[] {
    return this.siteService.getSectionTemplates(username, site, pageId);
  }

  // Publish a site
  @Put('repos/:username/:site')
  async publishSite(
    @Param('username') username: string,
    @Param('site') site: string,
    @Body() body: { remote: string; token: string },
  ): Promise<{ success: boolean; reason?: any }> {
    return this.siteService.publishSite(username, site, body.remote, body.token);
  }

  // Get a remote repo
  @Get('sites/:username/:site/remote')
  getRemoteRepo(
    @Param('username') username: string,
    @Param('site') site: string,
  ): { remote: string } {
    return this.siteService.getRemoteRepo(username, site);
  }
}
