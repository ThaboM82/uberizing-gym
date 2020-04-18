import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GymEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gym: number;

  @Column()
  start: string;

  @Column()
  end: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
