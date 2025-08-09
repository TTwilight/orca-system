import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsEnum,
  IsPhoneNumber,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsEnum(['customer', 'staff'])
  @IsOptional()
  user_type?: 'customer' | 'staff';

  @IsNumber()
  @IsOptional()
  status?: number;
}
