import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { BLOG_POST_NOT_FOUND_ERROR } from '../../shared/const';
import { BlogService } from '../blog/blog.service';
import { User } from '../user/entities/user.entity';
import { CreateBlogPostInput } from './dto/create-blog-post.input';
import { UpdateBlogPostInput } from './dto/update-blog-post.input';
import { BlogPost } from './entities/blog-post.entity';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,
    private readonly blogService: BlogService,
  ) {}

  async create(user: User, createBlogPostInput: CreateBlogPostInput) {
    await this.blogService.ensureBlog(createBlogPostInput.blogId);

    const blogPost = await this.blogPostRepository.create({
      ...createBlogPostInput,
      author: user,
    });

    return this.blogPostRepository.save(blogPost);
  }

  async findAllByBlogId(blogId: number) {
    await this.blogService.ensureBlog(blogId);

    return this.blogPostRepository.find({
      where: { blogId },
    });
  }

  async findById(id: number) {
    const blogPost = await this.blogPostRepository.findOne({
      where: { id: Equal(id) },
    });

    if (!blogPost) {
      throw new NotFoundException(BLOG_POST_NOT_FOUND_ERROR);
    }

    return blogPost;
  }

  async update(updateBlogPostInput: UpdateBlogPostInput) {
    const blogPost = await this.findById(updateBlogPostInput.id);

    return this.blogPostRepository.save({
      ...blogPost,
      ...updateBlogPostInput,
    });
  }

  async remove(id: number) {
    await this.ensureBlogPost(id);
    await this.blogPostRepository.delete(id);

    return true;
  }

  async ensureBlogPost(id: number) {
    const blogPost = await this.findById(id);

    return Boolean(blogPost);
  }
}
