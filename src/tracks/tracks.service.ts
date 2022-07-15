import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import * as uuid from 'uuid';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TracksService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}
  public static tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto): Track {
    const count = TracksService.tracks.push({
      ...createTrackDto,
      id: uuid.v4(),
    });
    return TracksService.tracks[count - 1];
  }

  findAll() {
    return TracksService.tracks;
  }

  findOne(id: string): Track {
    const track = TracksService.tracks.find((track) => track.id === id);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const i = TracksService.tracks.findIndex((track) => track.id === id);
    if (i === -1) throw new NotFoundException('Track not found');
    TracksService.tracks[i] = {
      ...TracksService.tracks[i],
      ...updateTrackDto,
    };
    return TracksService.tracks[i];
  }

  remove(id: string) {
    const i = TracksService.tracks.findIndex((track) => track.id == id);
    if (i === -1) throw new NotFoundException('Track not found');
    TracksService.tracks.splice(i, 1);

    this.favoritesService.remove(id, 'track');
  }
}
