import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'userLogin', description: 'Логин пользователя' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ example: '12345678', description: 'Пароль пользователя' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
