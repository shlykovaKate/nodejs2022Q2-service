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
    const index = this.favoritesService.findAll().tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      this.favoritesService.update(id, 'track');
      return `Track with ${id} has been added`;
    } else {
      return `Track with ${id} has AlREADY been added`;
    }
  }

  @Post('/album/:id')
  addAlbum(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Album's Id is invalid (not uuid)");
    }
    const index = this.favoritesService.findAll().albums.findIndex((album) => album.id === id);
    if (index === -1) {
      this.favoritesService.update(id, 'album');
      return `Album with ${id} has been added`;
    } else {
      return `Album with ${id} has AlREADY been added`;
    }
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Artist's Id is invalid (not uuid)");
    }
    const index = this.favoritesService.findAll().artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      this.favoritesService.update(id, 'artist');
      return `Artist with ${id} has been added`;
    } else {
      return `Artist with ${id} has AlREADY been added`;
    }
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
    this.favoritesService.remove(id, 'track');
    return `Track with ${id} has been removed`;
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Album's Id is invalid (not uuid)");
    }
    this.favoritesService.remove(id, 'album');
    return `Album with ${id} has been removed`;
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Artist's Id is invalid (not uuid)");
    }
    this.favoritesService.remove(id, 'artist');
    return `Artist with ${id} has been removed`;
  }
}
