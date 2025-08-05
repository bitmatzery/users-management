import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Subscription {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => AccountEntity) // Указываем, что это один объект AccountEntity
  @ManyToOne(() => AccountEntity, (account) => account.subscribers)
  account: AccountEntity;

  @Field(() => AccountEntity) // Указываем, что это один объект AccountEntity
  @ManyToOne(() => AccountEntity, (account) => account.subscriptions)
  subscriber: AccountEntity;
}
