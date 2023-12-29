import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: configService.getOrThrow('MYSQL_HOST'), // getOrThrow - throw an error if this env var aren't found
    port: configService.getOrThrow('MYSQL_PORT'),
    database: configService.getOrThrow('MYSQL_DATABASE'),
    username: configService.getOrThrow('MYSQL_USERNAME'),
    password: configService.getOrThrow('MYSQL_PASSWORD'),
    synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
    entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
    migrations: [ `${__dirname}/seeds/*{.ts,.js}`],
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource