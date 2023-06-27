import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive } from 'class-validator';

@InputType()
export class CreateBlogPostInput {
  @Field(() => Int)
  @IsPositive()
  @IsNotEmpty()
  blogId: number;

  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsNotEmpty()
  content: string;
}
