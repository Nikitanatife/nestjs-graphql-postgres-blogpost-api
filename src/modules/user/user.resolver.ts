import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../shared/decorators';
import { AuthGuard } from '../auth/guards';
import { UpdateUserInput } from './inputs';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') input: UpdateUserInput,
    @CurrentUser() user: User,
  ) {
    return this.userService.update(user, input);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async removeUser(@CurrentUser() user: User) {
    return this.userService.remove(user);
  }
}
