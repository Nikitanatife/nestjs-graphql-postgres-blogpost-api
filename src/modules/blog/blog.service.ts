import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import {
  AUTHOR_NOT_FOUND_ERROR,
  BLOG_NOT_FOUND_ERROR,
} from '../../shared/const';
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

  async findAll() {
    return this.blogRepository.find();
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

  async update(id: number, updateBlogInput: UpdateBlogInput) {
    return this.blogRepository.update(id, updateBlogInput);
  }

  async remove(id: number) {
    await this.blogRepository.delete(id);

    return true;
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
}
