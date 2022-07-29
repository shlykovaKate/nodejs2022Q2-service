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
  async addTrack(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Track's Id is invalid (not uuid)");
    }
    const index = (await this.favoritesService.findAll()).tracks.findIndex(
      (track) => track.id === id,
    );
    if (index === -1) {
      await this.favoritesService.update(id, 'track');
      return `Track with id: ${id} has been added`;
    } else {
      return `Track with id: ${id} has AlREADY been added`;
    }
  }

  @Post('/album/:id')
  async addAlbum(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Album's Id is invalid (not uuid)");
    }
    const favorites = await this.favoritesService.findAll();
    const index = favorites.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      await this.favoritesService.update(id, 'album');
      return `Album with id: ${id} has been added`;
    } else {
      return `Album with id: ${id} has AlREADY been added`;
    }
  }

  @Post('/artist/:id')
  async addArtist(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Artist's Id is invalid (not uuid)");
    }
    const favorites = await this.favoritesService.findAll();
    const index = favorites.artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      await this.favoritesService.update(id, 'artist');
      return `Artist with id: ${id} has been added`;
    } else {
      return `Artist with id: ${id} has AlREADY been added`;
    }
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Track's Id is invalid (not uuid)");
    }
    await this.favoritesService.remove(id, 'track');
    return `Track with ${id} has been removed`;
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Album's Id is invalid (not uuid)");
    }
    await this.favoritesService.remove(id, 'album');
    return `Album with ${id} has been removed`;
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Artist's Id is invalid (not uuid)");
    }
    await this.favoritesService.remove(id, 'artist');
    return `Artist with ${id} has been removed`;
  }
}
