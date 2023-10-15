import { SeedsService } from "migrations/seeds.service";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Seeds1695376176113 implements MigrationInterface {
    name = 'Seeds1695376176113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const seedService = new SeedsService(queryRunner);
        await seedService.fetchAndInsertDataFromSwapi();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const seedService = new SeedsService(queryRunner);
        await seedService.clearTables();
    }
}
