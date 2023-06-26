import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBlogInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  description: string;
}
