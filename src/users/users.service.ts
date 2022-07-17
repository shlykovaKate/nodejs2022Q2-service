import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto): User {
    const count = this.users.push({
      ...createUserDto,
      id: uuid.v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return new User({ ...this.users[count - 1] });
  }

  findAll(): User[] {
    return this.users.map((user) => new User({ ...user }));
  }

  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return new User({ ...user });
    }
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const i = this.users.findIndex((user) => user.id == id);
    if (i === -1) throw new NotFoundException('User not found');
    if (this.users[i].password !== updatePasswordDto.oldPassword) {
      throw new HttpException(
        'Введите правильно старый пароль',
        HttpStatus.FORBIDDEN,
      );
    }
    this.users[i] = {
      ...this.users[i],
      password: updatePasswordDto.newPassword,
      version: this.users[i].version + 1,
      updatedAt: Date.now(),
    };
    return new User({ ...this.users[i] });
  }

  remove(id: string) {
    const i = this.users.findIndex((user) => user.id == id);
    if (i === -1) throw new NotFoundException('User not found');
    const user = this.users[i];
    this.users.splice(i, 1);
    return user;
  }
}
