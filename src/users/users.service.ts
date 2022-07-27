import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.login = createUserDto.login;
    user.password = createUserDto.password;
    user.version = 1;
    user.createdAt = Date.now();
    user.updatedAt = Date.now();

    return await this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return user;
    }
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto): Promise<User> {
    const user =  await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException(
        'Введите правильно старый пароль',
        HttpStatus.FORBIDDEN,
      );
    }

    Object.assign(user, {
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now()
    });
    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepository.delete(id);
  }
}
