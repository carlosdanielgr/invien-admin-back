import { IsArray, IsNumber, IsString } from 'class-validator';

export class PropertyDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  size: string;

  @IsNumber()
  rooms: number;

  @IsNumber()
  bathrooms: number;

  @IsNumber()
  garage: number;

  @IsString()
  price: string;

  @IsString()
  url_video: string;

  @IsString()
  url_map: string;

  @IsString()
  details: string;

  @IsString()
  description: string;

  @IsArray()
  images: string[];

  @IsArray()
  amenities: string[];
}
