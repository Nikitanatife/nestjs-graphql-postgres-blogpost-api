import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import {
  PASSWORD_REGEX,
  WRONG_CREDENTIALS_MESSAGE,
} from '../../../shared/const';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail({}, { message: WRONG_CREDENTIALS_MESSAGE })
  @IsNotEmpty({ message: WRONG_CREDENTIALS_MESSAGE })
  email: string;

  @Field()
  @Matches(PASSWORD_REGEX, {
    message: WRONG_CREDENTIALS_MESSAGE,
  })
  @MinLength(8, { message: WRONG_CREDENTIALS_MESSAGE })
  @IsNotEmpty({ message: WRONG_CREDENTIALS_MESSAGE })
  password: string;
}
