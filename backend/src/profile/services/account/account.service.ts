import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {CreateAccountDto} from "../../dto/account/create-account.dto";
import {AccountEntity} from "../../entities/account/account.entity";
import {Subscription} from "../../entities/account/subscription.entity";
import {Role} from "../../entities/account/roles.entity";
import {CreateRoleDto} from "../../dto/account/create-role.dto";


@Injectable()
export class AccountService {

  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>
  ) {
  }

  async findOne(id?: number): Promise<AccountEntity> {
    return await this.accountRepository.findOne({ where: { id } })
  }

  async findOneByName(username: string): Promise<AccountEntity> {
    return await this.accountRepository.findOne({ where: { username } })
  }

  async getUserByEmail(email: string): Promise<AccountEntity> {
    return await this.accountRepository.findOne({ where: { email } })
  }

  async findAll(): Promise<AccountEntity[]> {
    return await this.accountRepository.find()
  }

  async create(createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    const account = this.accountRepository.create(createAccountDto);
    return this.accountRepository.save(account);
  }

  // Метод для создания аккаунта
  // async create(createAccountDto: CreateAccountDto): Promise<AccountEntity> {
  //   const { role, ...rest } = createAccountDto;
  //
  //   let assignedRole: Role;
  //
  //   // Если роль передана, ищем её в базе данных
  //   if (role) {
  //     assignedRole = await this.roleRepository.findOne({ where: { value: role.value } });
  //   }
  //
  //   // Если роль не передана или не найдена, назначаем роль по умолчанию "user"
  //   if (!assignedRole) {
  //     assignedRole = await this.getDefaultUserRole();
  //   }
  //
  //   // Создаём новый аккаунт
  //   const newAccount = this.accountRepository.create({
  //     ...rest,
  //     role: assignedRole, // Назначаем роль
  //   });
  //
  //   return this.accountRepository.save(newAccount);
  // }


  async update(id: number, updateAccountDto: CreateAccountDto): Promise<AccountEntity> {
    await this.accountRepository.update(id, updateAccountDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    await this.accountRepository.delete({ id })
    return id
  }

  // фильтрует и разбивает акки на страницы на основе параметров запроса
  async getAccounts(
    stack?: string,
    firstName?: string,
    lastName?: string,
    city?: string,
    orderBy?: string,
    page: number = 1,
    size: number = 50,
  ): Promise<{ items: AccountEntity[]; total: number; page: number; size: number; pages: number }> {
    const queryBuilder = this.accountRepository.createQueryBuilder('account');

    if (stack) {
      queryBuilder.andWhere('account.stack @> :stack', { stack: [stack] });
    }

    if (firstName) {
      queryBuilder.andWhere('account.firstName ILIKE :firstName', { firstName: `%${firstName}%` });
    }

    if (lastName) {
      queryBuilder.andWhere('account.lastName ILIKE :lastName', { lastName: `%${lastName}%` });
    }

    if (city) {
      queryBuilder.andWhere('account.city ILIKE :city', { city: `%${city}%` });
    }

    const total = await queryBuilder.getCount();

    // Implement pagination
    const accounts = await queryBuilder
      .skip((page - 1) * size)
      .take(size)
      .getMany();

    return {
      items: accounts,
      total,
      page,
      size,
      pages: Math.ceil(total / size),
    };
  }

  // для роли
  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create( createRoleDto );
    return this.roleRepository.save(role);
  }

  async getRoleById(id: number): Promise<Role> {
    return await this.roleRepository.findOne({ where: { id } })
  }

  // Метод для поиска роли "user"
  async getDefaultUserRole(): Promise<Role> {
    return this.roleRepository.findOne({ where: { value: 'user' } });
  }

  // для подписки
  async subscribe(userId: number, accountId: number): Promise<void> {
    const subscription = new Subscription();
    subscription.subscriber = await this.accountRepository.findOne({ where: { id: userId } });
    subscription.account = await this.accountRepository.findOne({ where: { id: accountId } });

    // Save the subscription
    await this.subscriptionRepository.save(subscription);
  }

  // для отписки
  async unsubscribe(userId: number, accountId: number): Promise<void> {
    await this.subscriptionRepository.delete({
      subscriber: { id: userId },
      account: { id: accountId }
    });
  }

  //  для получения подписок
  async getSubscriptions(userId: number): Promise<AccountEntity[]> {
    const subscriptions = await this.subscriptionRepository.find({
      where: { subscriber: { id: userId } },
      relations: ['account'],
    });

    return subscriptions.map(subscription => subscription.account);
  }

  //  для получения подписчиков
  async getSubscribers(accountId: number): Promise<AccountEntity[]> {
    const subscribers = await this.subscriptionRepository.find({
      where: { account: { id: accountId } },
      relations: ['subscriber'],
    });

    return subscribers.map(subscription => subscription.subscriber);
  }
}
