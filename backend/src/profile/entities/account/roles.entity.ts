import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "@nestjs/graphql";
import {AccountEntity} from "./account.entity";

@ObjectType()
@Entity('roles')
export class Role{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ unique: true }) // Убедимся, что значение роли уникально
    value: string; // Название роли, например "user"

    @Field()
    @Column()
    description: string;

    // @Field(() => [AccountEntity]) // Связь с аккаунтами
    // @OneToMany(() => AccountEntity, (account) => account.role)
    // accounts: AccountEntity[]; // Все аккаунты, которые имеют эту роль
}
