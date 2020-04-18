import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GymEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'gym_id' })
  gymId: number;

  @Column()
  start: string;

  @Column()
  end: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
