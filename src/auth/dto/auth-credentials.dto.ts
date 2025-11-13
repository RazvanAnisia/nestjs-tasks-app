import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { passwordRegex } from 'src/helpers/regex';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(passwordRegex, { message: 'Password is too weak' })
  password: string;
}
