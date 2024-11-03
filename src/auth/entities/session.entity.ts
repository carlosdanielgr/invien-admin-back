import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  userId: string;

  @Column('text')
  token: string;

  @Column('date')
  createdAt: Date;

  @Column('date')
  expiresAt: Date;
}
