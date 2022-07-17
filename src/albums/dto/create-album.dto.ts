import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
