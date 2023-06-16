import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Matches, Min } from 'class-validator';
import { PASSWORD_REGEX, USER_NAME_REGEX } from '../../../shared/const';

@InputType()
export class CreateUserInput {
  @Field()
  @Matches(USER_NAME_REGEX, { message: 'Letters only' })
  @IsNotEmpty()
  firstName: string;

  @Field()
  @Matches(USER_NAME_REGEX, { message: 'Letters only' })
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsEmail()
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must contain lowercase and uppercase letters, number and special characters',
  })
  @Min(8)
  @IsNotEmpty()
  password: string;
}
