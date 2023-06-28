import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Min } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true, defaultValue: 100 })
  @Min(0)
  @IsInt()
  @IsOptional()
  take: 100;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @Min(0)
  @IsInt()
  @IsOptional()
  skip: 0;
}
