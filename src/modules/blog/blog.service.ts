import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async create(createBlogInput: CreateBlogInput) {
    return this.blogRepository.save(createBlogInput);
  }

  async findAll() {
    return this.blogRepository.find();
  }

  async findById(id: number) {
    const blog = await this.blogRepository.findOne({
      where: { id: Equal(id) },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
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
}
