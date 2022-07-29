import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  artist: string;

  @Column({ nullable: true })
  artistId: string; // refers to Artist

  @OneToMany(() => Track, (track) => track.albumId, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  tracks: Track[];
}
