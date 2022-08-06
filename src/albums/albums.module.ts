import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule),
    AuthModule
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
