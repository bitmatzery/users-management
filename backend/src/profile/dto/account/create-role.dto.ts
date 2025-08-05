// src/dto/account/create-role.dto

import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateRoleDto {
    @Field()
    @IsString()
    value: string;

    @Field()
    @IsString()
    description: string;
}
