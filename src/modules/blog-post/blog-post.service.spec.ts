import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BlogService } from '../blog/blog.service';
import { BlogPostService } from './blog-post.service';
import { BlogPost } from './entities/blog-post.entity';

describe('BlogPostService', () => {
  let service: BlogPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogPostService,
        { provide: BlogService, useValue: {} },
        { provide: getRepositoryToken(BlogPost), useValue: {} },
      ],
    }).compile();

    service = module.get<BlogPostService>(BlogPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
