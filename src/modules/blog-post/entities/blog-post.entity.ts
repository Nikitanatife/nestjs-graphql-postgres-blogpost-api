import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { LocalBaseEntity } from '../../../shared/const';
import { Blog } from '../../blog/entities/blog.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class BlogPost extends LocalBaseEntity {
  @Column()
  @Field()
  @IsNotEmpty()
  title: string;

  @Column()
  @Field()
  @IsNotEmpty()
  description: string;

  @Column()
  @Field()
  @IsNotEmpty()
  content: string;

  @Field(() => Blog)
  @ManyToOne(() => Blog, (blog) => blog.blogPosts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  blog: Blog;

  @Field(() => User)
  @ManyToOne(() => User, (author) => author.blogPosts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  author: User;

  @Column()
  @IsPositive()
  @IsNotEmpty()
  authorId: number;

  @Column()
  @IsPositive()
  @IsNotEmpty()
  blogId: number;
}
