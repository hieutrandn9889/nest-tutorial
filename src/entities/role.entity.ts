import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UserEntity from './user.entity';

@Entity()
class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  content: string;

  @OneToMany(() => UserEntity, (users) => users.role)
  @JoinColumn()
  users: UserEntity[];
}

export default RoleEntity;
