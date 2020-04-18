import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SavedGym {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: number;

  @Column()
  gym: number;
}
