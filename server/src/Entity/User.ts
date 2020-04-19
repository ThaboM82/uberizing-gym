import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName?: string;

  @Column({ name: 'last_name' })
  lastName?: string;

  @Column()
  username: string;

  @Column({ select: false })
  password?: string;

  @Column({ name: 'user_type' })
  userType?: string;

  @Column()
  email: string;

  @Column({ name: 'birth_date' })
  birthDate?: string;

  @Column()
  phone?: string;

  @Column()
  gender?: string;

  @Column({ name: 'profile_image' })
  profileImage?: string;

  @Column({
    name: 'created_on',
    type: 'datetime',
  })
  createdOn: string;

  @Column({
    name: 'updated_on',
    type: 'datetime',
  })
  updatedOn?: string;

  @Column({ name: 'street_address' })
  streetAddress?: string;

  @Column({ name: 'street_address2' })
  streetAddress2?: string;

  @Column()
  city?: string;

  @Column()
  state?: string;

  @Column()
  zip?: string;

  @Column()
  country?: string;
}
