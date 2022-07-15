import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}
  public static favorites: Favorite = {
    tracks: [],
    artists: [],
    albums: [],
  };

  findAll() {
    const allFavorites = {
      tracks: FavoritesService.favorites.tracks.map((id) => {
        return this.tracksService.findOne(id);
      }),
      artists: FavoritesService.favorites.artists.map((id) => {
        return this.artistsService.findOne(id);
      }),
      albums: FavoritesService.favorites.albums.map((id) => {
        return this.albumsService.findOne(id);
      }),
    };
    return allFavorites;
  }

  update(id: string, type: string) {
    switch (type) {
      case 'track': {
        const track = this.tracksService.findOne(id);
        if (!track)
          throw new UnprocessableEntityException(
            `Track with id === ${id} doesn't exist`,
          );
        FavoritesService.favorites.tracks.push(id);
        break;
      }
      case 'artist': {
        const artist = this.artistsService.findOne(id);
        if (!artist)
          throw new UnprocessableEntityException(
            `Artist with id === ${id} doesn't exist`,
          );
        FavoritesService.favorites.artists.push(id);
        break;
      }
      case 'album': {
        const album = this.albumsService.findOne(id);
        if (!album)
          throw new UnprocessableEntityException(
            `Album with id === ${id} doesn't exist`,
          );
        FavoritesService.favorites.albums.push(id);
        break;
      }
    }
  }

  remove(id: string, type: string) {
    switch (type) {
      case 'track': {
        FavoritesService.favorites.tracks =
          FavoritesService.favorites.tracks.filter((trackId) => trackId !== id);
        break;
      }
      case 'artist': {
        FavoritesService.favorites.artists =
          FavoritesService.favorites.artists.filter(
            (artistId) => artistId !== id,
          );
        break;
      }
      case 'album': {
        FavoritesService.favorites.albums =
          FavoritesService.favorites.albums.filter((albumId) => albumId !== id);
        break;
      }
    }
  }
}
