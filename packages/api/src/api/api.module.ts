import { Module } from '@nestjs/common';
import { LobbyController } from './lobby/lobby.controller';
import { AdminController } from './admin/admin.controller';
import { PagesService } from './admin/pages.service';

@Module({
  controllers: [LobbyController, AdminController],
  providers: [PagesService],
})
export class ApiModule {}
