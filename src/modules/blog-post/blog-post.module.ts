import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './blog-post.entity';
import { BlogPostResolver } from './blog-post.resolver';
import { BlogPostService } from './blog-post.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost])],
  providers: [BlogPostResolver, BlogPostService],
})
export class BlogPostModule {}
