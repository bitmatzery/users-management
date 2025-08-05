import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import {Field, ID, Int, ObjectType} from '@nestjs/graphql'
import {Subscription} from "./subscription.entity";
import {Role} from "./roles.entity";

@ObjectType()
@Entity('account')
export class AccountEntity {
	// @Field(() => Int)
	@Field(() => ID) // Можно использовать ID для уникального идентификатора
	@PrimaryGeneratedColumn()
	id: number

	// @Field()
	// @Column()
	// example: string;

	@Field()
	@Column()
	username: string;

	@Field()
	@Column()
	email: string;

	@Field()
	@Column()
	password: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	avatarUrl: string;

	@Field(() =>  Int)
	@Column()
	subscribersAmount: number;

	@Field()
	@Column()
	firstName: string;

	@Field()
	@Column()
	lastName: string;

	@Field()
	@Column()
	isActive: boolean;

	@Field(() => [String])
	@Column('text', { array: true })
	stack: string[];

	@Field()
	@Column()
	city: string;

	@Field()
	@Column()
	description?: string;

	// @Field(() => Role)
	// @ManyToOne(() => Role, (role) => role.accounts)
	// role: Role;

	@Field(() => [Subscription])
	@OneToMany(() => Subscription, (subscription) => subscription.subscriber)
	subscriptions: Subscription[];

	@Field(() => [Subscription])
	@OneToMany(() => Subscription, (subscription) => subscription.account)
	subscribers: Subscription[];
}
