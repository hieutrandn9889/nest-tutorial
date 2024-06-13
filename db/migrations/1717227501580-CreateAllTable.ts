import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllTable1717227501580 implements MigrationInterface {
    name = 'CreateAllTable1717227501580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`permission\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categoryName\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cars\` (\`id\` int NOT NULL AUTO_INCREMENT, \`productName\` varchar(255) NOT NULL, \`price\` varchar(255) NOT NULL, \`category_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`roleId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD CONSTRAINT \`FK_9b6410d2f4eabb985524faae074\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_95ab8e7157a5bb4bc0e51aefdd2\` FOREIGN KEY (\`roleId\`) REFERENCES \`role_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_95ab8e7157a5bb4bc0e51aefdd2\``);
        await queryRunner.query(`ALTER TABLE \`cars\` DROP FOREIGN KEY \`FK_9b6410d2f4eabb985524faae074\``);
        await queryRunner.query(`DROP TABLE \`user_entity\``);
        await queryRunner.query(`DROP TABLE \`role_entity\``);
        await queryRunner.query(`DROP TABLE \`cars\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP TABLE \`accounts\``);
    }

}
