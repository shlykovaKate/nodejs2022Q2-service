import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  artist: Artist;

  @Column({ nullable: true })
  artistId: string; // refers to Artist

  @ManyToOne(() => Album, (album) => album.id, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  album: Album;

  @Column({ nullable: true })
  albumId: string; // refers to Album

  @Column({ nullable: true })
  duration: number; // integer number
}
