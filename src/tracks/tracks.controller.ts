import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  BadRequestException,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate as uuidValidate } from 'uuid';
import { DataSource } from 'typeorm';

@Controller('track')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private dataSource: DataSource,
  ) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Track's Id is invalid (not uuid)");
    }
    const track = await this.tracksService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Track's Id is invalid (not uuid)");
    }
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Track's Id is invalid (not uuid)");
    }
    return this.tracksService.remove(id);
  }
}
