import { Injectable } from '@nestjs/common';
import { BusinessException, ErrorCode } from '../../common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@/database/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 检查手机号是否已被注册
    const existingUser = await this.findByPhone(createUserDto.phone);
    if (existingUser) {
      // 记录手机号已被注册的日志
      console.log(`用户手机号 ${createUserDto.phone} 已被注册`);
      throw new BusinessException('-1', '该用户已存在');
    }

    const password = createUserDto.password || '123456';

    const user = this.userRepository.create({
      ...createUserDto,
      password: password,
      // 设置默认密码和用户类型
      user_type: createUserDto.user_type || 'customer',
    });

    // 密码加盐处理
    const salt = await bcrypt.genSalt();
    user.password_hash = await bcrypt.hash(password, salt);

    console.log('user', user);
    const result = await this.userRepository.save(user);
    if (!result) {
      // 记录创建用户失败的日志
      console.log(`创建用户失败，手机号: ${createUserDto.phone}`);
      throw new BusinessException('-1', '创建用户失败');
    }
    return result;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      console.log(`未找到ID为${id}的用户`);
      return null;
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ phone });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) {
      // 记录用户不存在的日志
      console.log(`尝试更新不存在的用户，ID: ${id}`);
      return null;
    }

    let passwordObj = {};
    // 如果更新包含密码，需要重新加盐
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      const password_hash = await bcrypt.hash(updateUserDto.password, salt);
      passwordObj = {
        password_hash: password_hash,
        password: updateUserDto.password,
      };
    }

    Object.assign(user, updateUserDto, passwordObj);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) {
      // 记录用户不存在的日志
      console.log(`尝试删除不存在的用户，ID: ${id}`);
      return null;
    }
    return await this.userRepository.remove(user);
  }
}
