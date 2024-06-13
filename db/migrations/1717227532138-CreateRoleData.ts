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
        content: 'QUAN_LY',
      },
      {
        id: 2,
        name: 'STUDENT',
        content: 'HOCVIEN',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    
  }
}
