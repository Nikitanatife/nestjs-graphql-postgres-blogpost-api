import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, Matches } from 'class-validator';
import { NAME_ERROR, USER_NAME_REGEX } from '../../../shared/const';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @Matches(USER_NAME_REGEX, { message: NAME_ERROR })
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @Matches(USER_NAME_REGEX, { message: NAME_ERROR })
  @IsOptional()
  lastName?: string;

  token?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  password?: string;
}
