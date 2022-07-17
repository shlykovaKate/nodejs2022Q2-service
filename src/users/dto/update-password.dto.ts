import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: '12345678',
    description: 'Старый пароль пользователя',
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string; // previous password

  @ApiProperty({
    example: '187654321',
    description: 'Новый пароль пользователя',
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string; // new password
}
