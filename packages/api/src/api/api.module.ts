import { Module } from '@nestjs/common';
import { LobbyController } from './lobby/lobby.controller';

@Module({
  controllers: [LobbyController],
  providers: [],
})
export class ApiModule {}
