// src/auth/auth.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {Body, HttpCode, Post} from "@nestjs/common";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // @Mutation(() => String)
  // async login(@Args('username') username: string): Promise<{ access_token: string }> {
  //   return this.authService.login(username);
  // }


  @Post('token')
  @HttpCode(200)
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{ access_token: string; refresh_token: string; token_type: string }> {
    return this.authService.login(username, password);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refresh_token: string): Promise<
    { access_token: string; refresh_token: string; token_type: string }> {
    return this.authService.refreshToken(refresh_token);
  }

  @Post('logout')
  @HttpCode(200)
  async logout(): Promise<string> {
    return this.authService.logout();
  }

}


