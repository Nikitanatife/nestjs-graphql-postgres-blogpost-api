import { Injectable } from '@nestjs/common';
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

  async create(input: CreateUserInput) {
    return this.userRepository.save(input);
  }

  // TODO: remove this
  // async ensureUser(id: number) {
  //   const user = await this.userRepository.findOne({
  //     where: { id: Equal(id) },
  //   });
  //
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //
  //   return user;
  // }

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
}
