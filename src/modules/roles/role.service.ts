import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RoleEntity from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import { SearchByNameReq } from './role.controller';
import UserEntity from 'src/entities/user.entity';
import { AuthPermission, UserDto } from 'src/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    protected readonly roleRepo: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    protected readonly userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async findAll(req: SearchByNameReq): Promise<any> {
    const { name, page = 1, pageSize = 10 } = req;
    if (page < 1) {
      throw new BadRequestException('Page number must be greater than 0');
    }
    if (pageSize < 1) {
      throw new BadRequestException('Page size must be greater than 10');
    }

    const query = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role');

    if (name) {
      query.andWhere('user.name LIKE :name', { name: `%${name}%` });
    }

    query.skip((page - 1) * pageSize).take(pageSize);

    const [users, total] = await query.getManyAndCount();
    const newUsers = users.map((item) => new UserDto(item));

    return {
      list: newUsers,
      total,
      page: Number(page),
      pageSize: Number(pageSize),
    };
  }

  async login(body: { name: string }): Promise<any> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.name = :name', { name: body.name })
      .getOne();

    return {
      token: await this.jwtService.signAsync(new UserDto(user)),
      expiredTime: 900000,
    };
  }
}
