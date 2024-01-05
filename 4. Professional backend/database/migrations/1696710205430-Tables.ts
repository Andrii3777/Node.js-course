import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1696710205430 implements MigrationInterface {
    name = 'Tables1696710205430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExistPromises = [
            queryRunner.hasTable("planet"),
            queryRunner.hasTable("species"),
            queryRunner.hasTable("starship"),
            queryRunner.hasTable("vehicle"),
            queryRunner.hasTable("person"),
            queryRunner.hasTable("film"),
            queryRunner.hasTable("image"),
            queryRunner.hasTable("user"),
            queryRunner.hasTable("person_species"),
            queryRunner.hasTable("person_vehicle"),
            queryRunner.hasTable("person_starship"),
            queryRunner.hasTable("film_person"),
            queryRunner.hasTable("film_planet"),
            queryRunner.hasTable("film_starship"),
            queryRunner.hasTable("film_vehicle"),
            queryRunner.hasTable("film_species"),
            queryRunner.hasTable("image_film"),
            queryRunner.hasTable("image_person"),
            queryRunner.hasTable("image_planet"),
            queryRunner.hasTable("image_species"),
            queryRunner.hasTable("image_vehicle"),
            queryRunner.hasTable("image_starship"),
        ];

        const tableExistResults = await Promise.all(tableExistPromises);
        if (!tableExistResults.every((exists) => exists)) {
            await queryRunner.query(`CREATE TABLE \`planet\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`rotation_period\` varchar(255) NOT NULL, \`orbital_period\` varchar(255) NOT NULL, \`diameter\` varchar(255) NOT NULL, \`climate\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` varchar(255) NOT NULL, \`population\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`species\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`hair_colors\` varchar(255) NOT NULL, \`eye_colors\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`starship\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`hyperdrive_rating\` varchar(255) NOT NULL, \`MGLT\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`vehicle\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`person\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`url\` varchar(255) NOT NULL, \`homeworldId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`film\` (\`id\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`episode_id\` varchar(255) NOT NULL, \`opening_crawl\` text NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` varchar(255) NOT NULL, \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`filename\` varchar(255) NOT NULL, \`link\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_f3396945b75336a47dc511cffb\` (\`filename\`), UNIQUE INDEX \`IDX_8fd453dcf8731cc181d4837b99\` (\`link\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`pass\` varchar(255) NOT NULL, \`roles\` enum ('user', 'admin') NOT NULL DEFAULT 'user', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`person_species\` (\`personId\` int NOT NULL, \`speciesId\` int NOT NULL, INDEX \`IDX_173e1c141080a410e4ea1537e1\` (\`personId\`), INDEX \`IDX_786dbbf6a74af9ec02090a0d63\` (\`speciesId\`), PRIMARY KEY (\`personId\`, \`speciesId\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`person_vehicle\` (\`personId\` int NOT NULL, \`vehicleId\` int NOT NULL, INDEX \`IDX_705393766e5151c37eecbf7b1d\` (\`personId\`), INDEX \`IDX_054ecc399d344066a49b864c14\` (\`vehicleId\`), PRIMARY KEY (\`personId\`, \`vehicleId\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`person_starship\` (\`personId\` int NOT NULL, \`starshipId\` int NOT NULL, INDEX \`IDX_dab5b05e025eea70ff5c83c222\` (\`personId\`), INDEX \`IDX_d13622860574c085476f341ed6\` (\`starshipId\`), PRIMARY KEY (\`personId\`, \`starshipId\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`film_person\` (\`filmId\` int NOT NULL, \`personId\` int NOT NULL, INDEX \`IDX_fc6b5e4028d3840b9988d3addc\` (\`filmId\`), INDEX \`IDX_abd23ede340f007dbe15fe34a2\` (\`personId\`), PRIMARY KEY (\`filmId\`, \`personId\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`film_planet\` (\`filmId\` int NOT NULL, \`planetId\` int NOT NULL, INDEX \`IDX_543fdf76d82bd5cc46a89d3ec6\` (\`filmId\`), INDEX \`IDX_46b2951e00bf2874c35203c0fa\` (\`planetId\`), PRIMARY KEY (\`filmId\`, \`planetId\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`film_starship\` (\`filmId\` int NOT NULL, \`starshipId\` int NOT NULL, INDEX \`IDX_7187c40c8cea66e10a22e3c2f8\` (\`filmId\`), INDEX \`IDX_e417a9e9d13edef0d3fcb324c3\` (\`starshipId\`), PRIMARY KEY (\`filmId\`, \`starshipId\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`film_vehicle\` (\`filmId\` int NOT NULL, \`vehicleId\` int NOT NULL, INDEX \`IDX_a341e6fbed99fdf64d4804b53f\` (\`filmId\`), INDEX \`IDX_7aa95bbab1b5e6206e3ff4f74c\` (\`vehicleId\`), PRIMARY KEY (\`filmId\`, \`vehicleId\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`film_species\` (\`filmId\` int NOT NULL, \`speciesId\` int NOT NULL, INDEX \`IDX_3da9c6d50e6f9be02d2b20681a\` (\`filmId\`), INDEX \`IDX_f7ac9ebb935b4dca8ff1a1ed52\` (\`speciesId\`), PRIMARY KEY (\`filmId\`, \`speciesId\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`image_film\` (\`imageId\` int NOT NULL, \`filmId\` int NOT NULL, INDEX \`IDX_8bec9c98c094b995879bc230cb\` (\`imageId\`), INDEX \`IDX_276b17c0a3feaccab2de111aee\` (\`filmId\`), PRIMARY KEY (\`imageId\`, \`filmId\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`image_person\` (\`imageId\` int NOT NULL, \`personId\` int NOT NULL, INDEX \`IDX_6d79d7fad4a5e1e335c9857267\` (\`imageId\`), INDEX \`IDX_41b33f410c401c115103b70396\` (\`personId\`), PRIMARY KEY (\`imageId\`, \`personId\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`image_planet\` (\`imageId\` int NOT NULL, \`planetId\` int NOT NULL, INDEX \`IDX_eeca55a4cbebbf0fb799b9575e\` (\`imageId\`), INDEX \`IDX_759979901b6fb02b55c195e978\` (\`planetId\`), PRIMARY KEY (\`imageId\`, \`planetId\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`image_species\` (\`imageId\` int NOT NULL, \`speciesId\` int NOT NULL, INDEX \`IDX_65008975e62fa741e32ff40651\` (\`imageId\`), INDEX \`IDX_4104ee7eac03765d1c17cdc886\` (\`speciesId\`), PRIMARY KEY (\`imageId\`, \`speciesId\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`image_vehicle\` (\`imageId\` int NOT NULL, \`vehicleId\` int NOT NULL, INDEX \`IDX_ab24612f0ee07c481c20ba69bd\` (\`imageId\`), INDEX \`IDX_fd549f4d35c71c8add5bd52c54\` (\`vehicleId\`), PRIMARY KEY (\`imageId\`, \`vehicleId\`)) ENGINE=InnoDB`);
            await queryRunner.query(`CREATE TABLE \`image_starship\` (\`imageId\` int NOT NULL, \`starshipId\` int NOT NULL, INDEX \`IDX_fae3c3a22cc410375768f20032\` (\`imageId\`), INDEX \`IDX_5d941d82f79d0aefb89bf5071f\` (\`starshipId\`), PRIMARY KEY (\`imageId\`, \`starshipId\`)) ENGINE=InnoDB`);
            await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_997edaa4b7b556c0d557cc6e1bb\` FOREIGN KEY (\`homeworldId\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            await queryRunner.query(`ALTER TABLE \`person_species\` ADD CONSTRAINT \`FK_173e1c141080a410e4ea1537e1a\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            await queryRunner.query(`ALTER TABLE \`person_species\` ADD CONSTRAINT \`FK_786dbbf6a74af9ec02090a0d63c\` FOREIGN KEY (\`speciesId\`) REFERENCES \`species\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            await queryRunner.query(`ALTER TABLE \`person_vehicle\` ADD CONSTRAINT \`FK_705393766e5151c37eecbf7b1df\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            await queryRunner.query(`ALTER TABLE \`person_vehicle\` ADD CONSTRAINT \`FK_054ecc399d344066a49b864c147\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            await queryRunner.query(`ALTER TABLE \`person_starship\` ADD CONSTRAINT \`FK_dab5b05e025eea70ff5c83c2223\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            await queryRunner.query(`ALTER TABLE \`person_starship\` ADD CONSTRAINT \`FK_d13622860574c085476f341ed69\` FOREIGN KEY (\`starshipId\`) REFERENCES \`starship\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            await queryRunner.query(`ALTER TABLE \`film_person\` ADD CONSTRAINT \`FK_fc6b5e4028d3840b9988d3addc8\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            await queryRunner.query(`ALTER TABLE \`film_person\` ADD CONSTRAINT \`FK_abd23ede340f007dbe15fe34a28\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            await queryRunner.query(`ALTER TABLE \`film_planet\` ADD CONSTRAINT \`FK_543fdf76d82bd5cc46a89d3ec60\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            await queryRunner.query(`ALTER TABLE \`film_planet\` ADD CONSTRAINT \`FK_46b2951e00bf2874c35203c0fad\` FOREIGN KEY (\`planetId\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            await queryRunner.query(`ALTER TABLE \`film_starship\` ADD CONSTRAINT \`FK_7187c40c8cea66e10a22e3c2f82\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            await queryRunner.query(`ALTER TABLE \`film_starship\` ADD CONSTRAINT \`FK_e417a9e9d13edef0d3fcb324c3e\` FOREIGN KEY (\`starshipId\`) REFERENCES \`starship\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            await queryRunner.query(`ALTER TABLE \`film_vehicle\` ADD CONSTRAINT \`FK_a341e6fbed99fdf64d4804b53f3\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            await queryRunner.query(`ALTER TABLE \`film_vehicle\` ADD CONSTRAINT \`FK_7aa95bbab1b5e6206e3ff4f74c7\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            await queryRunner.query(`ALTER TABLE \`film_species\` ADD CONSTRAINT \`FK_3da9c6d50e6f9be02d2b20681ae\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            await queryRunner.query(`ALTER TABLE \`film_species\` ADD CONSTRAINT \`FK_f7ac9ebb935b4dca8ff1a1ed52b\` FOREIGN KEY (\`speciesId\`) REFERENCES \`species\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            await queryRunner.query(`ALTER TABLE \`image_film\` ADD CONSTRAINT \`FK_8bec9c98c094b995879bc230cb2\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            await queryRunner.query(`ALTER TABLE \`image_film\` ADD CONSTRAINT \`FK_276b17c0a3feaccab2de111aeee\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            await queryRunner.query(`ALTER TABLE \`image_person\` ADD CONSTRAINT \`FK_6d79d7fad4a5e1e335c98572678\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            await queryRunner.query(`ALTER TABLE \`image_person\` ADD CONSTRAINT \`FK_41b33f410c401c115103b703969\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            await queryRunner.query(`ALTER TABLE \`image_planet\` ADD CONSTRAINT \`FK_eeca55a4cbebbf0fb799b9575ee\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            await queryRunner.query(`ALTER TABLE \`image_planet\` ADD CONSTRAINT \`FK_759979901b6fb02b55c195e9781\` FOREIGN KEY (\`planetId\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            await queryRunner.query(`ALTER TABLE \`image_species\` ADD CONSTRAINT \`FK_65008975e62fa741e32ff406514\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            await queryRunner.query(`ALTER TABLE \`image_species\` ADD CONSTRAINT \`FK_4104ee7eac03765d1c17cdc8863\` FOREIGN KEY (\`speciesId\`) REFERENCES \`species\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            await queryRunner.query(`ALTER TABLE \`image_vehicle\` ADD CONSTRAINT \`FK_ab24612f0ee07c481c20ba69bd4\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            await queryRunner.query(`ALTER TABLE \`image_vehicle\` ADD CONSTRAINT \`FK_fd549f4d35c71c8add5bd52c543\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            await queryRunner.query(`ALTER TABLE \`image_starship\` ADD CONSTRAINT \`FK_fae3c3a22cc410375768f20032c\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            await queryRunner.query(`ALTER TABLE \`image_starship\` ADD CONSTRAINT \`FK_5d941d82f79d0aefb89bf5071f4\` FOREIGN KEY (\`starshipId\`) REFERENCES \`starship\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image_starship\` DROP FOREIGN KEY \`FK_5d941d82f79d0aefb89bf5071f4\``);
        await queryRunner.query(`ALTER TABLE \`image_starship\` DROP FOREIGN KEY \`FK_fae3c3a22cc410375768f20032c\``);
        await queryRunner.query(`ALTER TABLE \`image_vehicle\` DROP FOREIGN KEY \`FK_fd549f4d35c71c8add5bd52c543\``);
        await queryRunner.query(`ALTER TABLE \`image_vehicle\` DROP FOREIGN KEY \`FK_ab24612f0ee07c481c20ba69bd4\``);
        await queryRunner.query(`ALTER TABLE \`image_species\` DROP FOREIGN KEY \`FK_4104ee7eac03765d1c17cdc8863\``);
        await queryRunner.query(`ALTER TABLE \`image_species\` DROP FOREIGN KEY \`FK_65008975e62fa741e32ff406514\``);
        await queryRunner.query(`ALTER TABLE \`image_planet\` DROP FOREIGN KEY \`FK_759979901b6fb02b55c195e9781\``);
        await queryRunner.query(`ALTER TABLE \`image_planet\` DROP FOREIGN KEY \`FK_eeca55a4cbebbf0fb799b9575ee\``);
        await queryRunner.query(`ALTER TABLE \`image_person\` DROP FOREIGN KEY \`FK_41b33f410c401c115103b703969\``);
        await queryRunner.query(`ALTER TABLE \`image_person\` DROP FOREIGN KEY \`FK_6d79d7fad4a5e1e335c98572678\``);
        await queryRunner.query(`ALTER TABLE \`image_film\` DROP FOREIGN KEY \`FK_276b17c0a3feaccab2de111aeee\``);
        await queryRunner.query(`ALTER TABLE \`image_film\` DROP FOREIGN KEY \`FK_8bec9c98c094b995879bc230cb2\``);
        await queryRunner.query(`ALTER TABLE \`film_species\` DROP FOREIGN KEY \`FK_f7ac9ebb935b4dca8ff1a1ed52b\``);
        await queryRunner.query(`ALTER TABLE \`film_species\` DROP FOREIGN KEY \`FK_3da9c6d50e6f9be02d2b20681ae\``);
        await queryRunner.query(`ALTER TABLE \`film_vehicle\` DROP FOREIGN KEY \`FK_7aa95bbab1b5e6206e3ff4f74c7\``);
        await queryRunner.query(`ALTER TABLE \`film_vehicle\` DROP FOREIGN KEY \`FK_a341e6fbed99fdf64d4804b53f3\``);
        await queryRunner.query(`ALTER TABLE \`film_starship\` DROP FOREIGN KEY \`FK_e417a9e9d13edef0d3fcb324c3e\``);
        await queryRunner.query(`ALTER TABLE \`film_starship\` DROP FOREIGN KEY \`FK_7187c40c8cea66e10a22e3c2f82\``);
        await queryRunner.query(`ALTER TABLE \`film_planet\` DROP FOREIGN KEY \`FK_46b2951e00bf2874c35203c0fad\``);
        await queryRunner.query(`ALTER TABLE \`film_planet\` DROP FOREIGN KEY \`FK_543fdf76d82bd5cc46a89d3ec60\``);
        await queryRunner.query(`ALTER TABLE \`film_person\` DROP FOREIGN KEY \`FK_abd23ede340f007dbe15fe34a28\``);
        await queryRunner.query(`ALTER TABLE \`film_person\` DROP FOREIGN KEY \`FK_fc6b5e4028d3840b9988d3addc8\``);
        await queryRunner.query(`ALTER TABLE \`person_starship\` DROP FOREIGN KEY \`FK_d13622860574c085476f341ed69\``);
        await queryRunner.query(`ALTER TABLE \`person_starship\` DROP FOREIGN KEY \`FK_dab5b05e025eea70ff5c83c2223\``);
        await queryRunner.query(`ALTER TABLE \`person_vehicle\` DROP FOREIGN KEY \`FK_054ecc399d344066a49b864c147\``);
        await queryRunner.query(`ALTER TABLE \`person_vehicle\` DROP FOREIGN KEY \`FK_705393766e5151c37eecbf7b1df\``);
        await queryRunner.query(`ALTER TABLE \`person_species\` DROP FOREIGN KEY \`FK_786dbbf6a74af9ec02090a0d63c\``);
        await queryRunner.query(`ALTER TABLE \`person_species\` DROP FOREIGN KEY \`FK_173e1c141080a410e4ea1537e1a\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_997edaa4b7b556c0d557cc6e1bb\``);
        await queryRunner.query(`DROP INDEX \`IDX_5d941d82f79d0aefb89bf5071f\` ON \`image_starship\``);
        await queryRunner.query(`DROP INDEX \`IDX_fae3c3a22cc410375768f20032\` ON \`image_starship\``);
        await queryRunner.query(`DROP TABLE \`image_starship\``);
        await queryRunner.query(`DROP INDEX \`IDX_fd549f4d35c71c8add5bd52c54\` ON \`image_vehicle\``);
        await queryRunner.query(`DROP INDEX \`IDX_ab24612f0ee07c481c20ba69bd\` ON \`image_vehicle\``);
        await queryRunner.query(`DROP TABLE \`image_vehicle\``);
        await queryRunner.query(`DROP INDEX \`IDX_4104ee7eac03765d1c17cdc886\` ON \`image_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_65008975e62fa741e32ff40651\` ON \`image_species\``);
        await queryRunner.query(`DROP TABLE \`image_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_759979901b6fb02b55c195e978\` ON \`image_planet\``);
        await queryRunner.query(`DROP INDEX \`IDX_eeca55a4cbebbf0fb799b9575e\` ON \`image_planet\``);
        await queryRunner.query(`DROP TABLE \`image_planet\``);
        await queryRunner.query(`DROP INDEX \`IDX_41b33f410c401c115103b70396\` ON \`image_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_6d79d7fad4a5e1e335c9857267\` ON \`image_person\``);
        await queryRunner.query(`DROP TABLE \`image_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_276b17c0a3feaccab2de111aee\` ON \`image_film\``);
        await queryRunner.query(`DROP INDEX \`IDX_8bec9c98c094b995879bc230cb\` ON \`image_film\``);
        await queryRunner.query(`DROP TABLE \`image_film\``);
        await queryRunner.query(`DROP INDEX \`IDX_f7ac9ebb935b4dca8ff1a1ed52\` ON \`film_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_3da9c6d50e6f9be02d2b20681a\` ON \`film_species\``);
        await queryRunner.query(`DROP TABLE \`film_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_7aa95bbab1b5e6206e3ff4f74c\` ON \`film_vehicle\``);
        await queryRunner.query(`DROP INDEX \`IDX_a341e6fbed99fdf64d4804b53f\` ON \`film_vehicle\``);
        await queryRunner.query(`DROP TABLE \`film_vehicle\``);
        await queryRunner.query(`DROP INDEX \`IDX_e417a9e9d13edef0d3fcb324c3\` ON \`film_starship\``);
        await queryRunner.query(`DROP INDEX \`IDX_7187c40c8cea66e10a22e3c2f8\` ON \`film_starship\``);
        await queryRunner.query(`DROP TABLE \`film_starship\``);
        await queryRunner.query(`DROP INDEX \`IDX_46b2951e00bf2874c35203c0fa\` ON \`film_planet\``);
        await queryRunner.query(`DROP INDEX \`IDX_543fdf76d82bd5cc46a89d3ec6\` ON \`film_planet\``);
        await queryRunner.query(`DROP TABLE \`film_planet\``);
        await queryRunner.query(`DROP INDEX \`IDX_abd23ede340f007dbe15fe34a2\` ON \`film_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_fc6b5e4028d3840b9988d3addc\` ON \`film_person\``);
        await queryRunner.query(`DROP TABLE \`film_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_d13622860574c085476f341ed6\` ON \`person_starship\``);
        await queryRunner.query(`DROP INDEX \`IDX_dab5b05e025eea70ff5c83c222\` ON \`person_starship\``);
        await queryRunner.query(`DROP TABLE \`person_starship\``);
        await queryRunner.query(`DROP INDEX \`IDX_054ecc399d344066a49b864c14\` ON \`person_vehicle\``);
        await queryRunner.query(`DROP INDEX \`IDX_705393766e5151c37eecbf7b1d\` ON \`person_vehicle\``);
        await queryRunner.query(`DROP TABLE \`person_vehicle\``);
        await queryRunner.query(`DROP INDEX \`IDX_786dbbf6a74af9ec02090a0d63\` ON \`person_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_173e1c141080a410e4ea1537e1\` ON \`person_species\``);
        await queryRunner.query(`DROP TABLE \`person_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_8fd453dcf8731cc181d4837b99\` ON \`image\``);
        await queryRunner.query(`DROP INDEX \`IDX_f3396945b75336a47dc511cffb\` ON \`image\``);
        await queryRunner.query(`DROP TABLE \`image\``);
        await queryRunner.query(`DROP TABLE \`film\``);
        await queryRunner.query(`DROP TABLE \`person\``);
        await queryRunner.query(`DROP TABLE \`vehicle\``);
        await queryRunner.query(`DROP TABLE \`starship\``);
        await queryRunner.query(`DROP TABLE \`species\``);
        await queryRunner.query(`DROP TABLE \`planet\``);
    }

}
