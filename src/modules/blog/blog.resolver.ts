import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from '../../shared/decorators';
import { AuthGuard } from '../auth/guards';
import { User } from '../user/entities/user.entity';
import { BlogService } from './blog.service';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.entity';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Blog)
  async createBlog(
    @Args('createBlogInput') createBlogInput: CreateBlogInput,
    @CurrentUser() user: User,
  ) {
    return this.blogService.create(user, createBlogInput);
  }

  @Query(() => [Blog])
  async findAllBlogs() {
    return this.blogService.findAll();
  }

  @Query(() => Blog)
  async findBlogById(@Args('id', { type: () => Int }) id: number) {
    return this.blogService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Blog)
  async updateBlog(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput) {
    return this.blogService.update(updateBlogInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async removeBlog(@Args('id', { type: () => Int }) id: number) {
    return this.blogService.remove(id);
  }

  @ResolveField(() => User)
  async author(@Parent() blog: Blog) {
    return this.blogService.findAuthor(blog.authorId);
  }
}
