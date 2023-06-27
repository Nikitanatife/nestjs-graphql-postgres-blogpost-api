import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { CreateBlogPostInput } from './create-blog-post.input';

@InputType()
export class UpdateBlogPostInput extends OmitType(
  PartialType(CreateBlogPostInput),
  ['blogId'] as const,
) {
  @Field(() => Int)
  @IsPositive()
  @IsNotEmpty()
  id: number;
}
