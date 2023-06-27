import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../shared/decorators';
import { IdValidationPipe } from '../../shared/pipes';
import { AuthGuard } from '../auth/guards';
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
  createBlogPost(
    @CurrentUser() user: User,
    @Args('createBlogPostInput') createBlogPostInput: CreateBlogPostInput,
  ) {
    return this.blogPostService.create(user, createBlogPostInput);
  }

  @Query(() => [BlogPost])
  findAllBlogPostsByBlogId(
    @Args('blogId', { type: () => Int }, IdValidationPipe) blogId: number,
  ) {
    return this.blogPostService.findAllByBlogId(blogId);
  }

  @Query(() => BlogPost)
  findBlogPostById(
    @Args('id', { type: () => Int }, IdValidationPipe) id: number,
  ) {
    return this.blogPostService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => BlogPost)
  updateBlogPost(
    @Args('updateBlogPostInput') updateBlogPostInput: UpdateBlogPostInput,
  ) {
    return this.blogPostService.update(updateBlogPostInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  removeBlogPost(
    @Args('id', { type: () => Int }, IdValidationPipe) id: number,
  ) {
    return this.blogPostService.remove(id);
  }
}
