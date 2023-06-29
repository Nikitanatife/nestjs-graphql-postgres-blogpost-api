import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { testUpdateWriterInput, testWriter } from '../../shared/const';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  const mockUserService = {
    update: jest.fn().mockImplementation((user, input) =>
      Promise.resolve({
        ...user,
        ...input,
      }),
    ),
    remove: jest.fn().mockImplementation(() => Promise.resolve(true)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('update user', async () => {
    expect(
      await resolver.updateUser(testUpdateWriterInput, testWriter),
    ).toEqual({
      ...testWriter,
      ...testUpdateWriterInput,
    });
  });

  it('remove user', async () => {
    expect(await resolver.removeUser(testWriter)).toEqual(true);
  });
});
