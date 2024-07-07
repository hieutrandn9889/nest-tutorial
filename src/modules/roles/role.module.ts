import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RoleEntity from 'src/entities/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import UserEntity from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
