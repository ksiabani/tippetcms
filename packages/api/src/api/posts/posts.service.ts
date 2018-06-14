import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  // Super database
  private readonly posts: any[] = [
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
  ];

  findAll(): any[] {
    return this.posts;
  }
}
