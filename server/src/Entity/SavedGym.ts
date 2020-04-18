import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SavedGym {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'gym_id' })
  gymId: number;
}
