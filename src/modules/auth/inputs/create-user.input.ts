import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { NAME_ERROR, USER_NAME_REGEX, UserRoles } from '../../../shared/const';
import { ChangePasswordInput } from './change-password.input';

@InputType()
export class CreateUserInput extends ChangePasswordInput {
  @Field()
  @Matches(USER_NAME_REGEX, { message: NAME_ERROR })
  @IsNotEmpty()
  firstName: string;

  @Field()
  @Matches(USER_NAME_REGEX, { message: NAME_ERROR })
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => UserRoles, { defaultValue: UserRoles.WRITER })
  @IsEnum(UserRoles)
  @IsOptional()
  role?: UserRoles;
}
