import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { LocalBaseEntity } from '../../../shared/const';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class Blog extends LocalBaseEntity {
  @Column()
  @Field()
  @IsNotEmpty()
  title: string;

  @Column()
  @Field()
  @IsNotEmpty()
  description: string;

  @Field(() => User)
  @ManyToOne(() => User, (author) => author.blogs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  author: User;
}
