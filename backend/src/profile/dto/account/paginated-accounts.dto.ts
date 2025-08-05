// src/account/dto/paginated-accounts.dto.ts
import { ObjectType, Field } from '@nestjs/graphql';
import {AccountEntity} from "../../entities/account/account.entity";

// тип GraphQL для представления постраничного ответа для учетных записей
@ObjectType()
export class PaginatedAccounts {
  @Field(() => [AccountEntity])
  items: AccountEntity[];

  @Field()
  total: number;

  @Field()
  page: number;

  @Field()
  size: number;

  @Field()
  pages: number;
}
