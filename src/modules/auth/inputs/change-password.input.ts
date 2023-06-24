import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';
import { PASSWORD_ERROR, PASSWORD_REGEX } from '../../../shared/const';

@InputType()
export class ChangePasswordInput {
  @Field()
  @Matches(PASSWORD_REGEX, {
    message: PASSWORD_ERROR,
  })
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
