import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import {
  LocalBaseEntity,
  PASSWORD_REGEX,
  USER_NAME_REGEX,
  UserRoles,
} from '../../../shared/const';
import { BlogPost } from '../../blog-post/entities/blog-post.entity';
import { Blog } from '../../blog/entities/blog.entity';

registerEnumType(UserRoles, { name: 'UserRoles' });

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

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.WRITER })
  @Field(() => UserRoles, { defaultValue: UserRoles.WRITER })
  @IsEnum(UserRoles)
  @IsOptional()
  role: UserRoles;

  @Column({ nullable: true })
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  token?: string;

  @Field(() => [Blog], { nullable: true })
  @OneToMany(() => Blog, (blog) => blog.author)
  blogs?: Blog[];

  @Field(() => [BlogPost], { nullable: true })
  @OneToMany(() => BlogPost, (blogPost) => blogPost.author)
  blogPosts?: BlogPost[];
}
