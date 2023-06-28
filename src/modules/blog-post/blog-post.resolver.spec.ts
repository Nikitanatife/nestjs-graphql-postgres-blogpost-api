import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { BlogPostResolver } from './blog-post.resolver';
import { BlogPostService } from './blog-post.service';

describe('BlogPostResolver', () => {
  let resolver: BlogPostResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogPostResolver,
        { provide: BlogPostService, useValue: {} },
        { provide: UserService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    resolver = module.get<BlogPostResolver>(BlogPostResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
