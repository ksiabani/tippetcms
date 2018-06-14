import { Module } from '@nestjs/common';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
})
export class ApiModule {}
