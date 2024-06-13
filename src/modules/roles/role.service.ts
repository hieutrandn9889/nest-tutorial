import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RoleEntity from 'src/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    protected readonly roleRepo: Repository<RoleEntity>,
  ) {}

  async findAll(): Promise<any> {
    const roleRes = await this.roleRepo
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.users', 'user')
      .where('role.id = :id', { id: 1 })
      .getOne();
    return roleRes;
  }
}
