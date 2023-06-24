import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../shared/decorators';
import { User } from '../user';
import { AuthGuard } from './guards';
import { ChangePasswordInput, CreateUserInput, LoginInput } from './inputs';
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

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async changePassword(
    @Args('changePasswordInput') { password }: ChangePasswordInput,
    @CurrentUser() user: User,
  ) {
    return this.authService.changePassword(user, password);
  }

  @UseGuards(AuthGuard)
  @Query(() => Boolean)
  async logout(@CurrentUser() user: User) {
    return this.authService.logout(user);
  }
}
