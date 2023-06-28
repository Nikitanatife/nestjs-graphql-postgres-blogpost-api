import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  testBaseEntity,
  testCreateWriterInput,
  testWriter,
} from '../../shared/const';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const password = 'test';
  const mockUserRepository = {
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ ...user, ...testBaseEntity }),
      ),
    findOne: jest.fn().mockImplementation((query) => {
      const property = Object.keys(query.where)[0];

      return Promise.resolve({
        ...testCreateWriterInput,
        ...testBaseEntity,
        [property]: query.where[property],
      });
    }),
    delete: jest.fn().mockImplementation(() => Promise.resolve(true)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user', async () => {
    expect(
      await service.create({ ...testCreateWriterInput, password }),
    ).toEqual({
      ...testCreateWriterInput,
      ...testBaseEntity,
      password,
    });
  });

  it('find user by email', async () => {
    expect(
      await service.findOne({ where: { email: testWriter.email } }),
    ).toEqual({
      ...testCreateWriterInput,
      ...testBaseEntity,
      email: testWriter.email,
    });
  });

  it('remove user', async () => {
    expect(await service.remove(testWriter)).toEqual(true);
  });
});
