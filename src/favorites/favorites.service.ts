import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { Album } from 'src/albums/entities/album.entity';
import { ArtistsService } from 'src/artists/artists.service';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { TracksService } from 'src/tracks/tracks.service';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
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
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {}

  async create(): Promise<Favorite> {
    const createFavoriteDto = new CreateFavoriteDto();
    createFavoriteDto.albums = [];
    createFavoriteDto.tracks = [];
    createFavoriteDto.artists = [];
    return await this.favoritesRepository.save(createFavoriteDto);
  }

  async findAll() {
    let favorites = await this.favoritesRepository.findOneBy({ id: 1 });
  
    if (!favorites) {
      favorites = await this.create();
    }

    const returnedFavorites: {
      tracks: Track[];
      artists: Artist[];
      albums: Album[];
    } = {
      tracks: await Promise.all(
        favorites.tracks.map(async (id) => await this.tracksService.findOne(id))
      ),
      artists: await Promise.all(
        favorites.artists.map(async (id) => await this.artistsService.findOne(id))
      ),
      albums: await Promise.all(
        favorites.albums.map(async(id) => await this.albumsService.findOne(id))
      ),
    };
    return returnedFavorites;
  }

  async update(id: string, type: string) {
    switch (type) {
      case 'track': {
        const track = await this.tracksService.findOne(id);
        if (!track)
          throw new UnprocessableEntityException(
            `Track with id === ${id} doesn't exist`,
          );
        const favorites = await this.favoritesRepository.findOneBy({ id: 1 });
        favorites.tracks.push(id);
        await this.favoritesRepository.save(favorites);
        break;
      }
      case 'artist': {
        const artist = await this.artistsService.findOne(id);
        if (!artist)
          throw new UnprocessableEntityException(
            `Artist with id === ${id} doesn't exist`,
          );
        const favorites = await this.favoritesRepository.findOneBy({ id: 1 });
        favorites.artists.push(id);
        await this.favoritesRepository.save(favorites);
        break;
      }
      case 'album': {
        const album = await this.albumsService.findOne(id);
        if (!album)
          throw new UnprocessableEntityException(
            `Album with id === ${id} doesn't exist`,
          );
        const favorites = await this.favoritesRepository.findOneBy({ id: 1 });
        favorites.albums.push(id);
        await this.favoritesRepository.save(favorites);
        break;
      }
    }
  }

  async remove(id: string, type: string) {
    switch (type) {
      case 'track': {
        const favorites = await this.favoritesRepository.findOneBy({ id: 1 });
        favorites.tracks = favorites.tracks.filter((trackId) => trackId !== id);
        await this.favoritesRepository.save(favorites);
        break;
      }
      case 'artist': {
        const favorites = await this.favoritesRepository.findOneBy({ id: 1 });
        favorites.artists = favorites.artists.filter((artistId) => artistId !== id);
        await this.favoritesRepository.save(favorites);
        break;
      }
      case 'album': {
        const favorites = await this.favoritesRepository.findOneBy({ id: 1 });
        favorites.albums = favorites.albums.filter((albumId) => albumId !== id);
        await this.favoritesRepository.save(favorites);
        break;
      }
    }
  }

  async removeFavs(){
    await this.favoritesRepository.delete(1);
  }
}
