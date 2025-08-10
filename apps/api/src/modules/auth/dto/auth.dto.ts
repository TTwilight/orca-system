import {
  IsString,
  IsEmail,
  MinLength,
  IsPhoneNumber,
  isString,
} from 'class-validator';

export class LoginEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
export class LoginMobileDto {
  @IsString()
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  countryCode?: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}

export class ValidateTokenDto {
  @IsString()
  token: string;
}
