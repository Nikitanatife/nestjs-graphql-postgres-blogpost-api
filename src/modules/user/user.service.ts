import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
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

  async findOne(options: FindOneOptions<User>) {
    return this.userRepository.findOne(options);
  }

  async update(user: User, input: UpdateUserInput) {
    return this.userRepository.save({ ...user, ...input });
  }

  async remove(user: User) {
    await this.userRepository.delete(user.id);

    return true;
  }
}
