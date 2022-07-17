import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import * as uuid from 'uuid';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}
  public static albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto): Album {
    const count = AlbumsService.albums.push({
      ...createAlbumDto,
      id: uuid.v4(),
    });
    return AlbumsService.albums[count - 1];
  }

  findAll() {
    return AlbumsService.albums;
  }

  findOne(id: string): Album {
    const album = AlbumsService.albums.find((album) => album.id === id);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const i = AlbumsService.albums.findIndex((album) => album.id === id);
    if (i === -1) throw new NotFoundException('Album not found');
    AlbumsService.albums[i] = {
      ...AlbumsService.albums[i],
      ...updateAlbumDto,
    };
    return AlbumsService.albums[i];
  }

  remove(id: string) {
    const i = AlbumsService.albums.findIndex((album) => album.id === id);
    if (i === -1) throw new NotFoundException('Album not found');
    AlbumsService.albums.splice(i, 1);

    const tracks = this.tracksService.findAll();
    tracks.forEach((track) => {
      if (track.albumId === id) {
        this.tracksService.update(track.id, {
          albumId: null,
        });
      }
    });

    this.favoritesService.remove(id, 'album');
    return 'Album has been removed';
  }
}
