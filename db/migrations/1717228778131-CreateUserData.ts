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
            roleId: 2,
          },
          {
            id: 3,
            name: 'Nguyen Van A',
            email: 'nguyenvana@gmail.com',
            roleId: 3,
          },
          {
            id: 4,
            name: 'Nguyen Van B',
            email: 'nguyenvanb@gmail.com',
            roleId: 3,
          },
          {
            id: 5,
            name: 'Nguyen Van C',
            email: 'nguyenvanc@gmail.com',
            roleId: 3,
          },
          {
            id: 6,
            name: 'Nguyen Van D',
            email: 'nguyenvand@gmail.com',
            roleId: 3,
          },
          {
            id: 7,
            name: 'Nguyen Van E',
            email: 'nguyenvanE@gmail.com',
            roleId: 3,
          },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
