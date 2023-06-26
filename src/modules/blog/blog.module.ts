import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  providers: [BlogResolver, BlogService],
})
export class BlogModule {}
