import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import * as uuid from 'uuid';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private albumService: AlbumsService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}
  private static artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto): Artist {
    const count = ArtistsService.artists.push({
      ...createArtistDto,
      id: uuid.v4(),
    });
    return ArtistsService.artists[count - 1];
  }

  findAll() {
    return ArtistsService.artists;
  }

  findOne(id: string): Artist {
    const artist = ArtistsService.artists.find((artist) => artist.id === id);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const i = ArtistsService.artists.findIndex((artist) => artist.id === id);
    if (i === -1) throw new NotFoundException('Artist not found');
    ArtistsService.artists[i] = {
      ...ArtistsService.artists[i],
      ...updateArtistDto,
    };
    return ArtistsService.artists[i];
  }

  remove(id: string) {
    const i = ArtistsService.artists.findIndex((artist) => artist.id === id);
    if (i === -1) throw new NotFoundException('Artist not found');
    ArtistsService.artists.splice(i, 1);

    const tracks = this.tracksService.findAll();
    tracks.forEach((track) => {
      if (track.artistId === id) {
        this.tracksService.update(track.id, {
          artistId: null,
        });
      }
    });

    const albums = this.albumService.findAll();
    albums.forEach((album) => {
      if (album.artistId === id) {
        this.albumService.update(album.id, {
          artistId: null,
        });
      }
    });

    this.favoritesService.remove(id, 'artist');
  }
}
