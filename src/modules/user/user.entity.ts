import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  validateOrReject,
} from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import {
  LocalBaseEntity,
  PASSWORD_REGEX,
  USER_NAME_REGEX,
} from '../../shared/const';
import { BlogPost } from '../blog-post/blog-post.entity';

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

  // @Field()
  @Column()
  @Matches(PASSWORD_REGEX)
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  token?: string;

  @OneToMany('BlogPost', 'author')
  blogPosts?: BlogPost[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
