import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'

import { UsersModule } from './users/users.module'
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {TypeOrmModuleOptions} from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";
// import { AccountResolver } from './profile/resolvers/account/account.resolver';
// import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import {AccountModule} from "./profile/account.module";
import {FileUploadModule} from "./common/file-upload.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => ({
        type: config.get<'postgres'>('TYPEORM_CONNECTION'),
        host: config.get<string>('TYPEORM_HOST'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        // entities: [ __dirname + config.get('TYPEORM_ENTITIES')],
        // migrations: [__dirname + config.get('TYPEORM_MIGRATIONS')],
        // migrationsTableName: config.get('TYPEORM_MIGRATIONS_TABLE_NAME'),
        // synchronize: config.get('TYPEORM_SYNCHRONIZE'),
        // logging: config.get('TYPEORM_LOGGING'),
        // entities: [ __dirname + 'dist/**/*.entity{.ts,.js}' ],
        // migrations: [`${__dirname}/src/migrations/*{.ts,.js}`],
        // migrationsTableName: config.get('TYPEORM_MIGRATIONS_TABLE_NAME'),
        // synchronize: true,
        // autoLoadEntities: true,
        // logging: true,
        entities: [ __dirname + 'dist/**/*.entity{.ts,.js}' ],
        migrations: [`${__dirname}/dist/db/migrations/*{.ts,.js}`],
        migrationsTableName: config.get('TYPEORM_MIGRATIONS_TABLE_NAME'),
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    UsersModule,
    AccountModule,
    AuthModule,
    FileUploadModule,
  ]
})
export class AppModule {
}
