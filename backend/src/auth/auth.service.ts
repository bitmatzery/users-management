// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {AccountService} from "../profile/services/account/account.service";
import {AccountEntity} from "../profile/entities/account/account.entity";


@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<AccountEntity | null> {
    const user = await this.accountService.findOneByName(username);
    if (!user || user.password !== password) { // Password should be hashed and compared
      return null;
    }
    return user;
  }

  async login(username: string, password: string): Promise<{ access_token: string; refresh_token: string; token_type: string }> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '5m' }), // Example refresh token
      token_type: 'Bearer',
    };
  }

  async refreshToken(refresh_token: string): Promise<{ access_token: string; refresh_token: string; token_type: string }> {
    const payload = this.jwtService.verify(refresh_token); // Verify refresh token
    const newAccessToken = this.jwtService.sign({ username: payload.username, sub: payload.sub });
    return {
      access_token: newAccessToken,
      refresh_token, // Return the original refresh token for simplicity
      token_type: 'Bearer',
    };
  }

  async logout(): Promise<string> {
    // Implement logout logic if necessary (e.g., blacklist the token)
    return 'Successfully logged out.';
  }
}
