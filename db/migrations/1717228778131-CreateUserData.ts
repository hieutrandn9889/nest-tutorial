import UserEntity from "src/entities/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserData1717228778131 implements MigrationInterface {
    name = 'CreateUserData1717228778131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userEntity = queryRunner.connection.getRepository(UserEntity);
        await userEntity.insert([
          {
            id: 1,
            name: 'Ninedev',
            email: 'ninedev@gmail.com',
            roleId: 1,
          },
          {
            id: 2,
            name: 'TienKim',
            email: 'tienkim@gmail.com',
            roleId: 1,
          },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
