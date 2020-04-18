import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: number;

  @Column()
  event: number;
}
