// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import {AuthResolver} from "./auth.resolver";
import {JwtAuthGuard} from "./auth.guard";
import {AccountModule} from "../profile/account.module";


@Module({
  imports: [
    JwtModule.register({
      secret: 'your_jwt_secret', // Replace with your actual secret
      signOptions: { expiresIn: '60s' }, // Token expiration time
    }),
    AccountModule
  ],
  providers: [AuthService, JwtStrategy, AuthResolver, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
