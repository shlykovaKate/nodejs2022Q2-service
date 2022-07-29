import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TracksService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.tracksRepository.save(createTrackDto);
  }

  findAll(): Promise<Track[]> {
    return this.tracksRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    return await this.tracksRepository.findOneBy({ id });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) throw new NotFoundException('Track not found');
    Object.assign(track, updateTrackDto);
    const track2 = await this.tracksRepository.save(track);
    return track2;
  }

  async remove(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) throw new NotFoundException('Track not found');
    await this.tracksRepository.delete(id);
    await this.favoritesService.remove(id, 'track');
  }
}
