import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';

describe('BlogResolver', () => {
  let resolver: BlogResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogResolver,
        { provide: BlogService, useValue: {} },
        { provide: UserService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    resolver = module.get<BlogResolver>(BlogResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
