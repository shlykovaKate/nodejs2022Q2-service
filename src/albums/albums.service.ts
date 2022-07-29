import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumsRepository.save(createAlbumDto);
  }

  findAll(): Promise<Album[]> {
    return this.albumsRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    return await this.albumsRepository.findOneBy({ id });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) throw new NotFoundException('Album not found');
    Object.assign(album, updateAlbumDto);
    return await this.albumsRepository.save(album);
  }

  async remove(id: string): Promise<void> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) throw new NotFoundException('Album not found');
    await this.albumsRepository.delete(id);
    await this.favoritesService.remove(id, 'album');
  }
}
