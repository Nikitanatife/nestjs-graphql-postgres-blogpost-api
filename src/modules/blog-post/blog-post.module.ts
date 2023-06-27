import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { BlogModule } from '../blog/blog.module';
import { UserModule } from '../user/user.module';
import { BlogPostResolver } from './blog-post.resolver';
import { BlogPostService } from './blog-post.service';
import { BlogPost } from './entities/blog-post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogPost]),
    AuthModule,
    UserModule,
    BlogModule,
  ],
  providers: [BlogPostResolver, BlogPostService],
})
export class BlogPostModule {}
