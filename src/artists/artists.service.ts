import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { FavoritesService } from 'src/favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistsRepository.save(createArtistDto);
  }

  findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    return await this.artistsRepository.findOneBy({ id });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const track = await this.artistsRepository.findOneBy({ id });
    if (!track) throw new NotFoundException('Artist not found');
    Object.assign(track, updateArtistDto);
    return await this.artistsRepository.save(track);
  }

  async remove(id: string): Promise<void> {
    const track = await this.artistsRepository.findOneBy({ id });
    if (!track) throw new NotFoundException('Artist not found');
    await Promise.all([
      this.artistsRepository.delete(id),
      this.favoritesService.remove(id, 'artist'),
    ]);
  }
}
