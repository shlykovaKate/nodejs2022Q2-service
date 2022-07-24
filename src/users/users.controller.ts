import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  BadRequestException,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { validate as uuidValidate } from 'uuid';
import { DataSource } from 'typeorm';

@ApiTags('Пользователи')
@Controller('/user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private userService: UsersService, private dataSource: DataSource) {}

  @ApiOperation({ summary: 'Cоздание пользователя' })
  @ApiResponse({ status: 201, type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Получение одного пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("User's Id is invalid (not uuid)");
    }
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление пароля пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("User's Id is invalid (not uuid)");
    }
    return this.userService.update(id, updatePasswordDto);
  }

  @ApiOperation({ summary: 'Удаление одного пользователя' })
  @ApiResponse({ status: 204, type: User })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("User's Id is invalid (not uuid)");
    }
    this.userService.remove(id);
  }
}
