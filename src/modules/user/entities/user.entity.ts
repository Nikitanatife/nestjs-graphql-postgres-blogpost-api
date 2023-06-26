import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { Column, Entity } from 'typeorm';
import {
  LocalBaseEntity,
  PASSWORD_REGEX,
  USER_NAME_REGEX,
} from '../../../shared/const';

@Entity()
@ObjectType()
export class User extends LocalBaseEntity {
  @Column()
  @Field()
  @Matches(USER_NAME_REGEX)
  firstName: string;

  @Column()
  @Field()
  @Matches(USER_NAME_REGEX)
  lastName: string;

  @Column({ unique: true })
  @Field()
  @IsEmail()
  email: string;

  @Column()
  @Matches(PASSWORD_REGEX)
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  token?: string;
}
