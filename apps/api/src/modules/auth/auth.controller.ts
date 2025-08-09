import { Controller, Post, Body } from '@nestjs/common';
import { BusinessException, ErrorCode } from '../../common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginEmailDto, LoginMobileDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('loginByEmail')
  async loginEmail(@Body() loginEmailDto: LoginEmailDto) {
    return this.authService.loginEmail(
      loginEmailDto.email,
      loginEmailDto.password,
    );
  }

  @Post('loginByMobile')
  async loginMobile(@Body() loginMobileDto: LoginMobileDto) {
    return this.authService.loginMobile(
      loginMobileDto.phone,
      loginMobileDto.password,
    );
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(token, newPassword);
  }

  @Post('validate-token')
  async validateToken(@Body('token') token: string) {
    const user = await this.authService.validateToken(token);
    if (!user) {
      throw new BusinessException(ErrorCode.TOKEN_INVALID);
    }
    return { valid: true, user };
  }
}
