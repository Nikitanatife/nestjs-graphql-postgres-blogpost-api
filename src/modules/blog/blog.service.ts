import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindManyOptions, Repository } from 'typeorm';
import {
  AUTHOR_NOT_FOUND_ERROR,
  BLOG_NOT_FOUND_ERROR,
} from '../../shared/const';
import { checkUserRole } from '../../shared/utils';
import { BlogPost } from '../blog-post/entities/blog-post.entity';
import { User } from '../user/entities/user.entity';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async create(user: User, createBlogInput: CreateBlogInput) {
    const blog = await this.blogRepository.create({
      ...createBlogInput,
      author: user,
    });

    return this.blogRepository.save(blog);
  }

  async findAll(authorId?: number) {
    const options: FindManyOptions = {};

    if (authorId) {
      options.where = { authorId: Equal(authorId) };
    }

    return this.blogRepository.find(options);
  }

  async findById(id: number) {
    const blog = await this.blogRepository.findOne({
      where: { id: Equal(id) },
    });

    if (!blog) {
      throw new NotFoundException(BLOG_NOT_FOUND_ERROR);
    }

    return blog;
  }

  async update(user: User, updateBlogInput: UpdateBlogInput) {
    const blog = await this.findById(updateBlogInput.id);

    checkUserRole(user, blog);

    return this.blogRepository.save({ ...blog, ...updateBlogInput });
  }

  async remove(user: User, id: number) {
    const blog = await this.findById(id);

    checkUserRole(user, blog);

    await this.blogRepository.delete(id);

    return true;
  }

  async ensureBlog(blogId: number) {
    const blog = await this.findById(blogId);

    return Boolean(blog);
  }

  async findAuthor(id: number) {
    const author = await this.blogRepository
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id = :id', { id })
      .getOne();

    if (!author) {
      throw new NotFoundException(AUTHOR_NOT_FOUND_ERROR);
    }

    return author;
  }

  async findBlogPosts(id: number) {
    return this.blogRepository
      .createQueryBuilder()
      .select('blogPost')
      .from(BlogPost, 'blogPost')
      .where('blogPost.blogId = :id', { id })
      .getMany();
  }
}
