// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import {AccountEntity} from "../profile/entities/account/account.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your_jwt_secret', // Replace with your actual secret
    });
  }

  async validate(payload: { username: string; password: string }): Promise<AccountEntity>  {
    return await this.authService.validateUser(payload.username, payload.password);
  }
}
