import { BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import {
  CONFLICT_ERROR,
  testBaseEntity,
  testCreateWriterInput,
  testHashedPassword,
  testPassword,
  testWriter,
  WRONG_CREDENTIALS_MESSAGE,
} from '../../shared/const';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const findUserWithSuccessfulResult = jest.fn().mockImplementation((query) => {
    const property = Object.keys(query.where)[0];

    return Promise.resolve({
      ...testCreateWriterInput,
      ...testBaseEntity,
      password: testHashedPassword,
      [property]: query.where[property],
    });
  });
  const findUserWithFailureResult = jest
    .fn()
    .mockImplementation(() => undefined);
  const mockUserService = (findOneSuccess: boolean) => ({
    findOne: findOneSuccess
      ? findUserWithSuccessfulResult
      : findUserWithFailureResult,
    create: jest.fn().mockImplementation((user) =>
      Promise.resolve({
        ...testWriter,
        ...user,
      }),
    ),
    update: jest.fn().mockImplementation((user, input) =>
      Promise.resolve({
        ...user,
        ...input,
      }),
    ),
  });
  const mockJwtService = {
    signAsync: jest
      .fn()
      .mockImplementation((payload) =>
        Promise.resolve(JSON.stringify(payload)),
      ),
  };

  const testSetup = async (findOneSuccess: boolean) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: UserService, useValue: mockUserService(findOneSuccess) },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  };

  it('should be defined', async () => {
    await testSetup(false);
    expect(service).toBeDefined();
  });

  it('register user', async () => {
    await testSetup(false);
    expect(
      await service.register({
        ...testCreateWriterInput,
        password: testPassword,
      }),
    ).toEqual({
      ...testWriter,
      ...testCreateWriterInput,
      password: expect.any(String),
      token: expect.any(String),
    });
  });

  it('register user > email already exists > throw conflict exception', async () => {
    await testSetup(true);
    await expect(
      service.register({ ...testCreateWriterInput, password: 'any' }),
    ).rejects.toThrow(new ConflictException(CONFLICT_ERROR));
  });

  it('login user > email not found > throw bad request exception', async () => {
    await testSetup(false);
    await expect(
      service.login({ email: 'any', password: 'any' }),
    ).rejects.toThrow(new BadRequestException(WRONG_CREDENTIALS_MESSAGE));
  });

  it('login user > wrong password > throw not found exception', async () => {
    await testSetup(true);
    await expect(
      service.login({ email: 'any', password: 'any' }),
    ).rejects.toThrow(new BadRequestException(WRONG_CREDENTIALS_MESSAGE));
  });

  it('login user > success', async () => {
    await testSetup(true);
    expect(
      await service.login({
        email: testCreateWriterInput.email,
        password: testPassword,
      }),
    ).toEqual({
      ...testWriter,
      password: testHashedPassword,
      token: expect.any(String),
    });
  });

  it('logout', async () => {
    await testSetup(true);
    expect(await service.logout(testWriter)).toEqual(true);
  });

  it('test change password', async () => {
    await testSetup(true);
    expect(await service.changePassword(testWriter, 'newPassword')).toEqual(
      true,
    );
  });
});
