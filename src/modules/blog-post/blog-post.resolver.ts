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
import { Blog } from '../blog/entities/blog.entity';
import { User } from '../user/entities/user.entity';
import { BlogPostService } from './blog-post.service';
import { CreateBlogPostInput } from './dto/create-blog-post.input';
import { UpdateBlogPostInput } from './dto/update-blog-post.input';
import { BlogPost } from './entities/blog-post.entity';

@Resolver(() => BlogPost)
export class BlogPostResolver {
  constructor(private readonly blogPostService: BlogPostService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => BlogPost)
  async createBlogPost(
    @CurrentUser() user: User,
    @Args('createBlogPostInput') createBlogPostInput: CreateBlogPostInput,
  ) {
    return this.blogPostService.create(user, createBlogPostInput);
  }

  @Query(() => [BlogPost])
  async findAllBlogPostsByBlogId(
    @Args('blogId', { type: () => Int }, IdValidationPipe) blogId: number,
    @Args() pagination: PaginationArgs,
  ) {
    return this.blogPostService.findAllByBlogId(blogId, pagination);
  }

  @Query(() => BlogPost)
  async findBlogPostById(
    @Args('id', { type: () => Int }, IdValidationPipe) id: number,
  ) {
    return this.blogPostService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => BlogPost)
  async updateBlogPost(
    @Args('updateBlogPostInput') updateBlogPostInput: UpdateBlogPostInput,
    @CurrentUser() user: User,
  ) {
    return this.blogPostService.update(user, updateBlogPostInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async removeBlogPost(
    @Args('id', { type: () => Int }, IdValidationPipe) id: number,
    @CurrentUser() user: User,
  ) {
    return this.blogPostService.remove(user, id);
  }

  @ResolveField(() => Blog)
  async blog(@Parent() blogPost: BlogPost) {
    return this.blogPostService.findBlog(blogPost.blogId);
  }

  @ResolveField(() => User)
  async author(@Parent() blog: Blog) {
    return this.blogPostService.findAuthor(blog.authorId);
  }
}
