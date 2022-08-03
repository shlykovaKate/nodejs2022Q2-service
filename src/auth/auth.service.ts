import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDto) {

  }

  async signup(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByLogin(userDto.login);
    if (candidate) {
      throw new HttpException('Пользователь с таким login существует', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, process.env.CRYPT_SALT);
    const user = await this.usersService.create({...userDto, password: hashPassword});
    return this.generateToken(user)
  }

  async generateToken(user: User) {
    const payload = {
      login: user.login,
      id: user.id
    }
    return {
      token: this.jwtService.sign(payload)
    }
  }
}
