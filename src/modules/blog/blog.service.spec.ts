import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  testBaseEntity,
  testBlog,
  testCreateBlogInput,
  testWriter,
} from '../../shared/const';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';

describe('BlogService', () => {
  let service: BlogService;
  const mockBlogRepository = {
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      ...testBaseEntity,
    })),
    save: jest.fn().mockImplementation((blog) => Promise.resolve(blog)),
    findOne: jest.fn().mockImplementation((query) =>
      Promise.resolve({
        ...testBlog,
        id: query.where.id._value,
        author: testWriter,
        authorId: testWriter.id,
      }),
    ),
    find: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          ...testBlog,
        },
      ]),
    ),
    delete: jest.fn().mockImplementation(() => Promise.resolve(true)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        { provide: getRepositoryToken(Blog), useValue: mockBlogRepository },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create blog', async () => {
    expect(await service.create(testWriter, testCreateBlogInput)).toEqual({
      id: expect.any(Number),
      ...testCreateBlogInput,
      author: testWriter,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('find blog by id', async () => {
    const id = 1;
    expect(await service.findById(id)).toEqual({
      id,
      ...testCreateBlogInput,
      author: testWriter,
      authorId: testWriter.id,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('find all blogs', async () => {
    expect(await service.findAll({ take: 100, skip: 0 })).toEqual([testBlog]);
  });

  it('remove blog', async () => {
    expect(await service.remove(testWriter, 1)).toEqual(true);
  });
});
