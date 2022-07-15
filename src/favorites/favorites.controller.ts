import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { validate as uuidValidate } from 'uuid';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('/track/:id')
  addTrack(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Track's Id is invalid (not uuid)");
    }
    return this.favoritesService.update(id, 'track');
  }

  @Post('/album/:id')
  addAlbum(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Album's Id is invalid (not uuid)");
    }
    return this.favoritesService.update(id, 'album');
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Artist's Id is invalid (not uuid)");
    }
    return this.favoritesService.update(id, 'artist');
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Track's Id is invalid (not uuid)");
    }
    return this.favoritesService.remove(id, 'track');
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Album's Id is invalid (not uuid)");
    }
    return this.favoritesService.remove(id, 'album');
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Artist's Id is invalid (not uuid)");
    }
    return this.favoritesService.remove(id, 'artist');
  }
}
