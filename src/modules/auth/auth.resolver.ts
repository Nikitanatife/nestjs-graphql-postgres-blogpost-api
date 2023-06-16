import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './inputs';
import { AuthService } from './auth.service';
import { RegisterObjectType } from './object-types';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterObjectType)
  async register(@Args('input') input: CreateUserInput) {
    return this.authService.register(input);
  }

  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }
}
