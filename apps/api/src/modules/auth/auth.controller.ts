import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import {
  AuthGuard,
  BusinessException,
  ErrorCode,
  SkipAuth,
} from '../../common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginEmailDto, LoginMobileDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @SkipAuth() // 声明不需要身份校验
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('loginByEmail')
  @SkipAuth() // 声明不需要身份校验
  async loginEmail(@Body() loginEmailDto: LoginEmailDto) {
    return this.authService.loginEmail(
      loginEmailDto.email,
      loginEmailDto.password,
    );
  }

  @Post('loginByMobile')
  @SkipAuth() // 声明不需要身份校验
  async loginMobile(@Body() loginMobileDto: LoginMobileDto) {
    return this.authService.loginMobile(
      loginMobileDto.phone,
      loginMobileDto.password,
      loginMobileDto.countryCode,
    );
  }

  @Post('forgot-password')
  @SkipAuth() // 声明不需要身份校验
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  @SkipAuth() // 声明不需要身份校验
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(token, newPassword);
  }

  @Post('validate-token')
  @UseGuards(AuthGuard)
  async validateToken(@Body('token') token: string) {
    const user = await this.authService.validateToken(token);
    if (!user) {
      throw new BusinessException(ErrorCode.TOKEN_INVALID);
    }
    return { valid: true, user };
  }
}
