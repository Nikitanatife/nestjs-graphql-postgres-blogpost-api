import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { BLOG_POST_NOT_FOUND_ERROR } from '../../shared/const';
import { checkUserRole } from '../../shared/utils';
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
    const blog = await this.blogService.findById(createBlogPostInput.blogId);

    checkUserRole(user, blog);

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

  async update(user: User, updateBlogPostInput: UpdateBlogPostInput) {
    const blogPost = await this.findById(updateBlogPostInput.id);

    checkUserRole(user, blogPost);

    return this.blogPostRepository.save({
      ...blogPost,
      ...updateBlogPostInput,
    });
  }

  async remove(user: User, id: number) {
    const blogPost = await this.findById(id);

    checkUserRole(user, blogPost);

    await this.blogPostRepository.delete(id);

    return true;
  }

  async findBlog(blogId: number) {
    return this.blogService.findById(blogId);
  }

  async findAuthor(authorId: number) {
    return this.blogService.findAuthor(authorId);
  }
}
