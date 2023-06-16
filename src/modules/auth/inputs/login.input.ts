import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { PASSWORD_REGEX } from '../../../shared/const';

const ERROR_MESSAGE = 'Wrong credentials';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail({}, { message: ERROR_MESSAGE })
  @IsNotEmpty({ message: ERROR_MESSAGE })
  email: string;

  @Field()
  @Matches(PASSWORD_REGEX, {
    message: ERROR_MESSAGE,
  })
  @MinLength(8, { message: ERROR_MESSAGE })
  @IsNotEmpty({ message: ERROR_MESSAGE })
  password: string;
}
