import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../user';
import { CreateUserInput, LoginInput } from './inputs';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async register(@Args('registerInput') input: CreateUserInput) {
    return this.authService.register(input);
  }

  @Mutation(() => User)
  async login(@Args('loginInput') input: LoginInput) {
    return this.authService.login(input);
  }

  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }
}
