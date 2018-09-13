import { Module } from '@nestjs/common';
import { LobbyController } from './lobby/lobby.controller';
import { AdminController } from './admin/admin.controller';

@Module({
  controllers: [LobbyController, AdminController],
  providers: [],
})
export class ApiModule {}
