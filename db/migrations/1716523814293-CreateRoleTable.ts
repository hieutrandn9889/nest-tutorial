import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoleTable1716523814293 implements MigrationInterface {
    name = 'CreateRoleTable1716523814293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role_entity\` (\`id\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`role_entity\``);
    }

}
