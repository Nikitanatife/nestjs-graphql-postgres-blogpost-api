import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  baseEntity,
  testBlog,
  testBlogPost,
  testCreateBlogPostInput,
  testWriter,
} from '../../shared/const';
import { BlogService } from '../blog/blog.service';
import { BlogPostService } from './blog-post.service';
import { BlogPost } from './entities/blog-post.entity';

describe('BlogPostService', () => {
  let service: BlogPostService;
  const mockBlogPostRepository = {
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      ...baseEntity,
    })),
    save: jest.fn().mockImplementation((blogPost) => Promise.resolve(blogPost)),
    findOne: jest.fn().mockImplementation((query) =>
      Promise.resolve({
        ...testBlogPost,
        id: query.where.id._value,
        author: testWriter,
        authorId: testWriter.id,
      }),
    ),
    find: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          ...testBlogPost,
        },
      ]),
    ),
    delete: jest.fn().mockImplementation(() => Promise.resolve(true)),
  };
  const mockBlogService = {
    findById: jest.fn().mockImplementation((id) => ({
      ...baseEntity,
      ...testBlog,
      id,
      author: testWriter,
      authorId: testWriter.id,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogPostService,
        { provide: BlogService, useValue: mockBlogService },
        {
          provide: getRepositoryToken(BlogPost),
          useValue: mockBlogPostRepository,
        },
      ],
    }).compile();

    service = module.get<BlogPostService>(BlogPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create blog post', async () => {
    expect(await service.create(testWriter, testCreateBlogPostInput)).toEqual({
      id: expect.any(Number),
      ...testCreateBlogPostInput,
      author: testWriter,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('find blog post by id', async () => {
    const id = 1;
    expect(await service.findById(id)).toEqual({
      id,
      ...testCreateBlogPostInput,
      author: testWriter,
      authorId: testWriter.id,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('find all blog posts', async () => {
    expect(await service.findAllByBlogId(1, { take: 100, skip: 0 })).toEqual([
      testBlogPost,
    ]);
  });

  it('remove blog post', async () => {
    expect(await service.remove(testWriter, 1)).toEqual(true);
  });
});
