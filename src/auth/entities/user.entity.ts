import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  user: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.user = this.user.toLowerCase().trim();
  }
}
