import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  Post,
  Delete,
} from '@nestjs/common';
import { PagesService, TippetFile } from './pages.service';
import { MediaService } from './media.service';

@Controller('admin')
export class AdminController {
  constructor(private pagesService: PagesService, private mediaService: MediaService) {}

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
}
