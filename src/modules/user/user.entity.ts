import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, Matches, validateOrReject } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import {
  LocalBaseEntity,
  PASSWORD_REGEX,
  USER_NAME_REGEX,
} from '../../shared/const';

@ObjectType()
@Entity()
export class User extends LocalBaseEntity {
  @Field()
  @Column()
  @Matches(USER_NAME_REGEX)
  firstName: string;

  @Field()
  @Column()
  @Matches(USER_NAME_REGEX)
  lastName: string;

  @Field()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Field()
  @Column()
  @Matches(PASSWORD_REGEX)
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
