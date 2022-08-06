import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async signup(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByLogin(userDto.login);
    /*if (candidate) {
      throw new HttpException('Пользователь с таким login существует', HttpStatus.BAD_REQUEST);
    }*/
    const saltRounds = Number(process.env.CRYPT_SALT) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(userDto.password, salt);
    const user = await this.usersService.create({...userDto, password: hash});
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      login: user.login,
      id: user.id
    }
    return {
      accessToken: this.jwtService.sign(payload),
      id: user.id
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByLogin(userDto.login);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new HttpException('Некорректный логин или пароль', HttpStatus.FORBIDDEN);
  }
}
