import RoleEntity from 'src/entities/role.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRoleData1717227532138 implements MigrationInterface {
  name = 'CreateRoleData1717227532138';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleEntity = queryRunner.connection.getRepository(RoleEntity);
    await roleEntity.insert([
      {
        id: 1,
        name: 'ADMIN',
        content: 'Quản lý',
      },
      {
        id: 2,
        name: 'STUDENT',
        content: 'Học viên',
      },
      {
        id: 3,
        name: 'TEACHER',
        content: 'Giảng viên',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    
  }
}
