import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('favorites')
export class Favorite {
  @PrimaryColumn({ default: 1 })
  id: number;

  @Column({ type: 'simple-array', default: [] })
  artists: string[]; // favorite artists ids

  @Column({ type: 'simple-array', default: [] })
  albums: string[]; // favorite albums ids

  @Column({ type: 'simple-array', default: [] })
  tracks: string[]; // favorite tracks ids
}
