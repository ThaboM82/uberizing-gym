import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'event_id' })
  eventId: number;
}
