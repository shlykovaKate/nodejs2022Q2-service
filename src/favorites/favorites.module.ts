import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, AlbumsService, TracksService, ArtistsService],
})
export class FavoritesModule {}
