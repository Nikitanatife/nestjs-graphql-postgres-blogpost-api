import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserInput } from '../auth/inputs';
import { UpdateUserInput } from './inputs';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(input: CreateUserInput) {
    return this.userRepository.save(input);
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getOne(options: FindOneOptions<User>) {
    return this.userRepository.findOne(options);
  }

  async update(id: number, input: UpdateUserInput) {
    const user = await this.getById(id);

    return this.userRepository.save({ ...user, ...input });
  }
}
