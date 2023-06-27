import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  // Parent,
  // Query,
  // ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from '../../shared/decorators';
import { AuthGuard } from '../auth/guards';
// import { Blog } from '../blog/entities/blog.entity';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './inputs';
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

  // @UseGuards(AuthGuard)
  // @Query(() => User)
  // async me(@CurrentUser() user: User) {
  //   return user;
  // }
  //
  // @ResolveField()
  // async blogs(@Parent() user: User) {
  //   return this.userService.findBlogs(user);
  // }
}
