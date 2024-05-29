import { Inject, Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class TokenHelper {
  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly jwtServ: JwtService,
  ) { }

  async getRequestTokenAsync(): Promise<string> {
    return this.request.headers.authorization;
  }

  getRequestToken(): string {
    return this.request.headers.authorization;
  }

}
