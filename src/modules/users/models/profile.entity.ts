import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @Column()
  public name: string;
  @Column()
  public phone: string;
  @Column()
  public country: string;
  @OneToOne(() => User, (user: User) => user.profile)
  public user: User;
}
