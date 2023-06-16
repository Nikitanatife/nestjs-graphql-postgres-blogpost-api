import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Matches, Min } from 'class-validator';
import { PASSWORD_REGEX } from '../../../shared/const';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail({}, { message: 'Wrong credentials' })
  @IsNotEmpty()
  email: string;

  @Field()
  @Matches(PASSWORD_REGEX, {
    message: 'Wrong credentials',
  })
  @Min(8)
  @IsNotEmpty()
  password: string;
}
