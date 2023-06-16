import { Matches, validateOrReject, IsEmail } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import {
  LocalBaseEntity,
  PASSWORD_REGEX,
  USER_NAME_REGEX,
} from '../../shared/const';

@Entity()
export class User extends LocalBaseEntity {
  @Column()
  @Matches(USER_NAME_REGEX)
  firstName: string;

  @Column()
  @Matches(USER_NAME_REGEX)
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Matches(PASSWORD_REGEX)
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
