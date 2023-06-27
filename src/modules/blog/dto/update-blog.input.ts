import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { CreateBlogInput } from './create-blog.input';

@InputType()
export class UpdateBlogInput extends PartialType(CreateBlogInput) {
  @Field(() => Int)
  @IsPositive()
  @IsNotEmpty()
  id: number;
}
