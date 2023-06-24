import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { LocalBaseEntity } from '../../shared/const';
import { User } from '../user';

@ObjectType()
@Entity()
export class BlogPost extends LocalBaseEntity {
  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column()
  content: string;

  @ManyToOne('User', 'blogPosts', { nullable: false })
  author: User;
}
