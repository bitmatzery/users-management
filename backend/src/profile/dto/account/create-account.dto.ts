// src/dto/account/create-account.dto

import { InputType, Field, Int } from '@nestjs/graphql';
import {IsString, IsBoolean, IsArray, IsOptional, IsNumber} from 'class-validator';
import {Role} from "../../entities/account/roles.entity";
import {CreateRoleDto} from "./create-role.dto";

@InputType()
export class CreateAccountDto {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  email: string;

  // @Field()
  // @IsString()
  // example: string;

  @Field()
  @IsString()
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @Field()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field(() => [String])
  @IsOptional()
  @IsArray()
  stack?: string[];

  @Field()
  @IsOptional()
  @IsString()
  city?: string;

  @Field()
  @IsOptional()
  @IsString()
  description?: string;

  // @Field(() => CreateRoleDto, { nullable: true })
  // @IsOptional()
  // role?: CreateRoleDto;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  subscribersAmount?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;
}
