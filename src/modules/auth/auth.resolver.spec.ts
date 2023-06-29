import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { testCreateWriterInput, testWriter } from '../../shared/const';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  const mockAuthService = {
    register: jest.fn().mockImplementation((input) =>
      Promise.resolve({
        ...testWriter,
        ...input,
        token: JSON.stringify(input),
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('register', async () => {
    expect(await resolver.register(testCreateWriterInput)).toEqual({
      ...testWriter,
      token: expect.any(String),
    });
  });
});
