import { Injectable } from '@nestjs/common';
import { ResponseUtil, BusinessException, ErrorCode } from '../../common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    // 检查用户是否已存在
    const existingUser = await this.userService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new BusinessException(ErrorCode.USER_EXIST);
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // 生成 JWT token
    const token = this.jwtService.sign({ userId: user.id, email: user.email });

    return ResponseUtil.success({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BusinessException(ErrorCode.PASSWORD_ERROR, '邮箱或密码错误');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new BusinessException(ErrorCode.PASSWORD_ERROR, '邮箱或密码错误');
    }

    const token = this.jwtService.sign({ userId: user.id, email: user.email });

    return ResponseUtil.success({
      user: {
        id: user.id,
        email: user.email,
        username: user.name,
      },
      token,
    });
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BusinessException(ErrorCode.USER_NOT_EXIST);
    }

    // 生成重置密码的令牌
    const resetToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '1h' },
    );

    // TODO: 发送重置密码邮件
    // 这里应该集成邮件服务

    return ResponseUtil.success(null, '重置密码链接已发送到您的邮箱');
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userService.findOne(decoded.userId);

      if (!user) {
        throw new BusinessException(ErrorCode.USER_NOT_EXIST);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userService.update(user.id, { password: hashedPassword });

      return ResponseUtil.success(null, '密码重置成功');
    } catch (error) {
      throw new BusinessException(
        ErrorCode.TOKEN_INVALID,
        '无效或过期的重置链接',
      );
    }
  }

  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userService.findOne(decoded.userId);
      return user;
    } catch (error) {
      return null;
    }
  }
}
