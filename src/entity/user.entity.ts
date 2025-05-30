import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ nullable: true })
  userName: string;
  @Column()
  role: string;
  @Column({ nullable: true })
  refreshToken: string;
}
