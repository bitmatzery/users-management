import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CreateAccountDto } from "../../dto/account/create-account.dto";
import { AccountService } from "../../services/account/account.service";
import { AccountEntity } from "../../entities/account/account.entity";
import { JwtAuthGuard } from "../../../auth/auth.guard";
import {UseGuards, UseInterceptors, UploadedFile, Post, Body, NotFoundException} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { extname } from 'path';
import { PaginatedAccounts } from "../../dto/account/paginated-accounts.dto";
import {Role} from "../../entities/account/roles.entity";
import {CreateRoleDto} from "../../dto/account/create-role.dto";


@Resolver(() => AccountEntity)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  // @Mutation(() => AccountEntity)
  // async register(
  //   @Args('createAccountDto') createAccountDto: CreateAccountDto, // Получаем данные через DTO
  // ): Promise<AccountEntity> {
  //   // Устанавливаем roleId по умолчанию
  //   // if (!createAccountDto.role.id) {
  //   //   createAccountDto.role.id = 3; // Устанавливаем значение по умолчанию для roleId
  //   // } else {
  //   //   // Проверяем, существует ли указанный roleId в таблице ролей
  //   //   const roleExists = await this.accountService.getRoleById(createAccountDto.role.id);
  //   //   if (!roleExists) {
  //   //     throw new NotFoundException(`Role with id ${createAccountDto.role.id} does not exist.`);
  //   //   }
  //   // }
  //
  //   return this.accountService.create(createAccountDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AccountEntity], { name: 'testAccounts' })
  async getTestAccounts(): Promise<AccountEntity[]> {
    return this.accountService.findAll();

  }

  @UseGuards(JwtAuthGuard)
  @Query(() => AccountEntity, { name: 'me' })
  async getMe(@Context() context): Promise<AccountEntity> {
    const user = context.req.user;
    return this.accountService.findOne(user.id);
  }

  @Mutation(() => AccountEntity)
  async createAccount(@Args('createAccountDto') createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    return this.accountService.create(createAccountDto);
  }

  @Query(() => AccountEntity, { name: 'account' })
  async getAccountByID(@Args('id', { type: () => Int }) id: number): Promise<AccountEntity> {
    return this.accountService.findOne(id);
  }

  @Query(() => AccountEntity, { name: 'account' })
  async getAccountByName(@Args('username') username: string): Promise<AccountEntity> {
    return this.accountService.findOneByName(username);
  }

  @Mutation(() => AccountEntity)
  async updateAccount(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateAccountDto') updateAccountDto: CreateAccountDto,
  ): Promise<AccountEntity> {
    return this.accountService.update(id, updateAccountDto);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AccountEntity)
  async updateMe(
    @Context() context,
    @Args('updateAccountDto') updateAccountDto: CreateAccountDto,
  ): Promise<AccountEntity> {
    const user = context.req.user;
    return this.accountService.update(user.id, updateAccountDto);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteAccount(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.accountService.remove(id);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteMe(@Context() context): Promise<boolean> {
    const user = context.req.user;
    await this.accountService.remove(user.id);
    return true;
  }

  // Обработка загрузки изображений
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image')) // Используем FileInterceptor для загрузки файла
  @Mutation(() => AccountEntity)
  async uploadImage(
    @Context() context,
    @UploadedFile() image: Express.Multer.File, // Получаем загруженный файл
  ): Promise<AccountEntity> {
    const user = context.req.user;

    // Убедитесь, что файл существует
    if (!image) {
      throw new Error('File not uploaded');
    }

    const filePath = `uploads/${user.id}${extname(image.originalname)}`; // Определите путь для сохранения изображения

    // Используем createWriteStream для сохранения файла
    const writeStream = createWriteStream(filePath);
    writeStream.write(image.buffer); // Записываем буфер файла
    writeStream.end();

    // Получаем текущие данные аккаунта
    const account = await this.accountService.findOne(user.id);
    if (!account) {
      throw new Error('Account not found');
    }

    // Создаем объект с текущими данными аккаунта, изменяя только avatarUrl
    // const updatedAccountData: CreateAccountDto = {
    //   username: account.username, // Сохраняем текущее значение username
    //   isActive: account.isActive,   // Сохраняем текущее значение isActive
    //   stack: account.stack,         // Сохраняем текущее значение stack
    //   city: account.city,           // Сохраняем текущее значение city
    //   description: account.description, // Сохраняем текущее значение description
    //   avatarUrl: filePath,          // Устанавливаем новое значение avatarUrl
    // };

    // Обновляем учетную запись с новыми данными
    const updatedAccount = await this.accountService.update(user.id, user.avatarUrl);

    return updatedAccount;
  }

// Для удаления изображения
  @UseGuards(JwtAuthGuard)
  @Mutation(() => AccountEntity)
  async deleteImage(@Context() context): Promise<AccountEntity> {
    const user = context.req.user;
    const account = await this.accountService.findOne(user.id); // Получаем учетную запись

    if (account.avatarUrl) {
      const fs = require('fs');
      // Удаляем файл из файловой системы
      fs.unlinkSync(account.avatarUrl);
    }

    // Создаем объект с текущими данными аккаунта, изменяя только avatarUrl
    // const updatedAccountData: CreateAccountDto = {
    //   username: account.username, // Сохраните текущее значение username
    //   isActive: account.isActive,   // Сохраните текущее значение isActive
    //   stack: account.stack,         // Сохраните текущее значение stack
    //   city: account.city,           // Сохраните текущее значение city
    //   description: account.description, // Сохраните текущее значение description
    //   avatarUrl: null,              // Устанавливаем avatarUrl в null
    // };

    // Обновляем учетную запись, чтобы удалить avatarUrl
    const updatedAccount = await this.accountService.update(user.id, user.avatarUrl);

    return updatedAccount; // Возвращаем обновленную учетную запись
  }

  // Постраничный ответ, включая список учетных записей и сведения о постраничном выводе
  @Query(() => PaginatedAccounts, { name: 'accounts' })
  async getAccounts(
    @Args('stack', { nullable: true }) stack?: string,
    @Args('firstName', { nullable: true }) firstName?: string,
    @Args('lastName', { nullable: true }) lastName?: string,
    @Args('city', { nullable: true }) city?: string,
    @Args('orderBy', { nullable: true }) orderBy?: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number = 1,
    @Args('size', { type: () => Int, defaultValue: 50 }) size: number = 50,
  ): Promise<PaginatedAccounts> {
    return this.accountService.getAccounts(stack, firstName, lastName, city, orderBy, page, size);
  }


  // для роли
  @Mutation(() => Role)
  createRole(@Args('createRoleDto') createRoleDto: CreateRoleDto): Promise<Role> {
      return this.accountService.createRole(createRoleDto);
  }

  // получить акки по ролям
  @Query(() => Role, { name: 'account' })
  async getAccountByRole(@Args('role') role: string): Promise<AccountEntity> {
    return this.accountService.findOneByName(role);
  }

  // Для подписки
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async subscribe(@Args('accountId', { type: () => Int }) accountId: number, @Context() context): Promise<boolean> {
    const user = context.req.user; // Получаем аутентифицированного пользователя
    await this.accountService.subscribe(user.id, accountId);
    return true;
  }

  // Для отписки
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async unsubscribe(@Args('accountId', { type: () => Int }) accountId: number, @Context() context): Promise<boolean> {
    const user = context.req.user; // Получаем аутентифицированного пользователя
    await this.accountService.unsubscribe(user.id, accountId);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AccountEntity], { name: 'subscriptions' })
  async getSubscriptions(@Context() context): Promise<AccountEntity[]> {
    const user = context.req.user; // Получаем аутентифицированного пользователя
    return this.accountService.getSubscriptions(user.id); // Получаем подписки для пользователя
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AccountEntity], { name: 'subscribers' })
  async getSubscribers(@Args('accountId', { type: () => Int }) accountId: number): Promise<AccountEntity[]> {
    return this.accountService.getSubscribers(accountId); // Получаем подписчиков для данной учетной записи
  }

  // Дополнительные мутации и запросы можно добавить здесь
}
