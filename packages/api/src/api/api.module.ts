import { Module } from '@nestjs/common';
import { LobbyController } from './lobby/lobby.controller';
import { AdminController } from './admin/admin.controller';
import { PagesService } from './admin/pages.service';
import { MediaService } from './admin/media.service';
import { SitesService } from './admin/sites.service';

@Module({
  controllers: [LobbyController, AdminController],
  providers: [PagesService, MediaService, SitesService],
})
export class ApiModule {}
