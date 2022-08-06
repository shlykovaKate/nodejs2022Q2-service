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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { validate as uuidValidate } from 'uuid';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("User's Id is invalid (not uuid)");
    }
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("User's Id is invalid (not uuid)");
    }
    return this.userService.remove(id);
  }
}
