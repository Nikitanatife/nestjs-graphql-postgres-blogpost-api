import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { PASSWORD_REGEX, USER_NAME_REGEX } from '../../../shared/const';

@InputType()
export class CreateUserInput {
  @Field()
  @Matches(USER_NAME_REGEX, { message: 'Name must contain letters only' })
  @IsNotEmpty()
  firstName: string;

  @Field()
  @Matches(USER_NAME_REGEX, { message: 'Name must contain letters only' })
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must contain lowercase and uppercase letters, number and special characters',
  })
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
