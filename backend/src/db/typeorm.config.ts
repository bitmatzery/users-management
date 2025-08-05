// db/typeorm.config.ts
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('TYPEORM_HOST'),
  port: +configService.get('TYPEORM_PORT'),
  username: configService.get('TYPEORM_USERNAME'),
  password: String(configService.get('TYPEORM_PASSWORD')),
  database: configService.get('TYPEORM_DATABASE'),
  entities: [`${__dirname}/../dist/**/*.entity{.ts,.js}`],
  synchronize: true,
  logging: true,
  migrations: [`${__dirname}/dist/db/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
});
