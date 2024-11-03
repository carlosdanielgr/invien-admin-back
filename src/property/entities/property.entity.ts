import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  location: string;

  @Column('text')
  size: string;

  @Column('numeric')
  rooms: number;

  @Column('numeric')
  bathrooms: number;

  @Column('numeric')
  garage: number;

  @Column('text')
  price: string;

  @Column('text')
  url_video: string;

  @Column('text')
  url_map: string;

  @Column('text')
  details: string;

  @Column('text')
  description: string;

  @Column('simple-array')
  images: string[];

  @Column('simple-array')
  amenities: string[];
}
