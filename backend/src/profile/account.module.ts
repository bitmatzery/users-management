import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AccountEntity} from "./entities/account/account.entity";
import {AccountService} from "./services/account/account.service";
import {AccountResolver} from "./resolvers/account/account.resolver";
import {Subscription} from "./entities/account/subscription.entity";
import {Role} from "./entities/account/roles.entity";


@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, Subscription, Role])],
  providers: [AccountService, AccountResolver],
  exports: [AccountService],
})
export class AccountModule {}
