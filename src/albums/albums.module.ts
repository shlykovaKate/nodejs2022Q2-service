import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, TracksService, FavoritesService, ArtistsService],
  imports: [TypeOrmModule.forFeature([Album])],
})
export class AlbumsModule {}
