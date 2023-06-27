import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateBlogInput } from './create-blog.input';

@InputType()
export class UpdateBlogInput extends PartialType(CreateBlogInput) {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  id: number;
}
