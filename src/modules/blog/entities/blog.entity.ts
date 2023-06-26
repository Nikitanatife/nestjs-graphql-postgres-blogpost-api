import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { LocalBaseEntity } from '../../../shared/const';

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

  @Column()
  @Field()
  @IsNotEmpty()
  content: string;
}
