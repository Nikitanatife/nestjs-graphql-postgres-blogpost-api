import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostResolver } from './blog-post.resolver';

describe('BlogPostResolver', () => {
  let resolver: BlogPostResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogPostResolver],
    }).compile();

    resolver = module.get<BlogPostResolver>(BlogPostResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
