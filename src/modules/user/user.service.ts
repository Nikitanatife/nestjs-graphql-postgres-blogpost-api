import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOneOptions, Repository } from 'typeorm';
import { USER_NOT_FOUND_ERROR } from '../../shared/const';
import { CreateUserInput } from '../auth/inputs';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './inputs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(input: CreateUserInput) {
    return this.userRepository.save(input);
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: Equal(id) },
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    return user;
  }

  // TODO: remove this
  // async getById(id: number) {
  //   return this.ensureUser(id);
  // }

  async getOne(options: FindOneOptions<User>) {
    return this.userRepository.findOne(options);
  }

  async update(user: User, input: UpdateUserInput) {
    return this.userRepository.save({ ...user, ...input });
  }

  async remove(user: User) {
    await this.userRepository.delete(user.id);

    return true;
  }

  async findBlogs(user: User) {
    const result = await this.userRepository
      .createQueryBuilder()
      .select('blog')
      .from('blog', 'blog')
      .where('blog.authorId = :id', { id: user.id })
      .getMany();

    console.log(result);

    return result;
  }
}
