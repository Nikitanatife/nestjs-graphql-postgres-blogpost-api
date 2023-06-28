import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import {
  testBaseEntity,
  testBlog,
  testCreateBlogInput,
  testWriter,
} from '../../shared/const';
import { UserService } from '../user/user.service';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';

describe('BlogResolver', () => {
  let resolver: BlogResolver;
  const mockBlogService = {
    create: jest.fn().mockImplementation((user, input) =>
      Promise.resolve({
        ...input,
        ...testBaseEntity,
        author: user,
      }),
    ),
    findAll: jest.fn().mockImplementation(() => Promise.resolve([testBlog])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogResolver,
        { provide: BlogService, useValue: mockBlogService },
        { provide: UserService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    resolver = module.get<BlogResolver>(BlogResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('create blog', async () => {
    expect(await resolver.createBlog(testCreateBlogInput, testWriter)).toEqual({
      ...testCreateBlogInput,
      ...testBaseEntity,
      author: testWriter,
    });
  });

  it('find all blogs', async () => {
    expect(await resolver.findAllBlogs({ take: 100, skip: 0 })).toEqual([
      testBlog,
    ]);
  });
});
