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
    },
  ): Page | void {
    return this.pagesService.addPage(
      username,
      site,
      body.title,
      body.path,
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
    return this.siteService.buildSite(username, site);
  }

  // Get page templates
  @Get('sites/:username/:site')
  getPageTemplates(
    @Param('username') username: string,
    @Param('site') site: string,
  ): { name: string }[] {
    return this.siteService.getPageTemplates(username, site);
  }

  // Get section templates
  @Get('sites/:username/:site/:templateId')
  getSectionTemplates(
    @Param('username') username: string,
    @Param('site') site: string,
    @Param('templateId') templateId: string,
  ): { id: string; name: string }[] {
    return this.siteService.getSectionTemplates(username, site, templateId);
  }
}
