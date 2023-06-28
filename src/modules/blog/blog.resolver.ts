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
import { PaginationArgs } from '../../shared/const';
import { CurrentUser } from '../../shared/decorators';
import { IdValidationPipe } from '../../shared/pipes';
import { AuthGuard } from '../auth/guards';
import { BlogPost } from '../blog-post/entities/blog-post.entity';
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
  async findAllBlogs(
    @Args() pagination: PaginationArgs,
    @Args('authorId', { type: () => Int, nullable: true })
    authorId?: number,
  ) {
    return this.blogService.findAll(pagination, authorId);
  }

  @Query(() => Blog)
  async findBlogById(
    @Args('id', { type: () => Int }, IdValidationPipe) id: number,
  ) {
    return this.blogService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Blog)
  async updateBlog(
    @Args('updateBlogInput') updateBlogInput: UpdateBlogInput,
    @CurrentUser() user: User,
  ) {
    return this.blogService.update(user, updateBlogInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async removeBlog(
    @Args('id', { type: () => Int }, IdValidationPipe) id: number,
    @CurrentUser() user: User,
  ) {
    return this.blogService.remove(user, id);
  }

  @ResolveField(() => User)
  async author(@Parent() blog: Blog) {
    return this.blogService.findAuthor(blog.authorId);
  }

  @ResolveField(() => [BlogPost])
  async blogPosts(@Parent() blog: Blog, @Args() pagination: PaginationArgs) {
    return this.blogService.findBlogPosts(blog.id, pagination);
  }
}
