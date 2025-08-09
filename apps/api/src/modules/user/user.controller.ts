import { Controller, Post, Body } from '@nestjs/common';
import { ResponseUtil } from '../../common';
import { UserService } from './user.service';
// 导入更新用户的DTO类型
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    if (!user) {
      return ResponseUtil.error('创建用户失败');
    }
    return ResponseUtil.success(user.id);
  }

  @Post('list')
  async findAll() {
    const users = await this.userService.findAll();
    return ResponseUtil.success(users);
  }

  @Post('detail')
  async findOne(@Body('id') id: string | number) {
    const userId = Number(id);
    const user = await this.userService.findOne(userId);
    return ResponseUtil.success(user);
  }

  @Post('update')
  async update(
    @Body('id') id: string | number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = Number(id);
    const user = await this.userService.update(userId, updateUserDto);
    return ResponseUtil.success(user?.id || '');
  }

  @Post('delete')
  async remove(@Body('id') id: string | number) {
    const userId = Number(id);
    const result = await this.userService.remove(userId);
    return ResponseUtil.success(result?.id || '');
  }
}
