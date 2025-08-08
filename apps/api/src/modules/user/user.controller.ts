import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
// 导入更新用户的DTO类型
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('list')
  findAll() {
    return this.userService.findAll();
  }

  @Post('detail')
  findOne(@Body('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('update')
  update(@Body('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Post('delete')
  remove(@Body('id') id: string) {
    return this.userService.remove(id);
  }
}
