import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL_LOCAL,
    seeds: ['dist/db/seeds/**/*.js'],
};
export const dataSource = new DataSource(options);