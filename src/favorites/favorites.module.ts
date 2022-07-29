import { forwardRef, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorite } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService
  ],
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    AlbumsModule,
    forwardRef(() => TracksModule),
    ArtistsModule,
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
