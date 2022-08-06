import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  BadRequestException,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { validate as uuidValidate } from 'uuid';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/track/:id')
  async addTrack(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Track's Id is invalid (not uuid)");
    }
    const favorites = await this.favoritesService.findAll();
    const index = favorites.tracks.findIndex((track) => track && track.id && track.id === id);
    if (index === -1) {
      await this.favoritesService.update(id, 'track');
      return `Track with id: ${id} has been added`;
    } else {
      return `Track with id: ${id} has AlREADY been added`;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/album/:id')
  async addAlbum(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Album's Id is invalid (not uuid)");
    }
    const favorites = await this.favoritesService.findAll();
    const index = favorites.albums.findIndex((album) => album && album.id && album.id === id);
    if (index === -1) {
      await this.favoritesService.update(id, 'album');
      return `Album with id: ${id} has been added`;
    } else {
      return `Album with id: ${id} has AlREADY been added`;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/artist/:id')
  async addArtist(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Artist's Id is invalid (not uuid)");
    }
    const favorites = await this.favoritesService.findAll();
    const index = favorites.artists.findIndex((artist) => artist && artist.id && artist.id === id);
    if (index === -1) {
      await this.favoritesService.update(id, 'artist');
      return `Artist with id: ${id} has been added`;
    } else {
      return `Artist with id: ${id} has AlREADY been added`;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Track's Id is invalid (not uuid)");
    }
    await this.favoritesService.remove(id, 'track');
    return `Track with ${id} has been removed`;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Album's Id is invalid (not uuid)");
    }
    await this.favoritesService.remove(id, 'album');
    return `Album with ${id} has been removed`;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Artist's Id is invalid (not uuid)");
    }
    await this.favoritesService.remove(id, 'artist');
    return `Artist with ${id} has been removed`;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  @HttpCode(204)
  async removeFavs() {
    await this.favoritesService.removeFavs();
  }
}
