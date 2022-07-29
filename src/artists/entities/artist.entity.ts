import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.artistId, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  tracks: Track[];

  @OneToMany(() => Album, (album) => album.artistId, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  albums: Album[];
}
