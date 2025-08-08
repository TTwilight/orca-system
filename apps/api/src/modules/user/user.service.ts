import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto) {
    // 这里应该添加实际的数据库操作
    const user = new User({
      id: Date.now().toString(),
      ...createUserDto,
    });
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find(user => user.id === id);
  }

  findByEmail(email: string) {
    return this.users.find(user => user.email === email);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index > -1) {
      this.users[index] = { ...this.users[index], ...updateUserDto };
      return this.users[index];
    }
    return null;
  }

  remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index > -1) {
      const user = this.users[index];
      this.users.splice(index, 1);
      return user;
    }
    return null;
  }
}
