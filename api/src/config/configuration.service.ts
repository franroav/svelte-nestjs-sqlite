import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get appEnviroment(): string {
    return this.configService.get<string>('api-nestjs-config.appEnviroment');
  }

  get appPort(): number {
    return this.configService.get<number>('api-nestjs-config.appPort');
  }

  get appActiveSwagger(): boolean {
    return this.configService.get<boolean>('api-nestjs-config.appActiveSwagger');
  }

  get appActiveDatabase(): boolean {
    return this.configService.get<boolean>('api-nestjs-config.appActiveDataBase');
  }

  get appUserIdTokenSSO(): string {
    return this.configService.get<string>('api-nestjs-config.appUserIdTokenSSO');
  }

  get appValidateUserIdTokenSSO(): string {
    return this.configService.get<string>('api-nestjs-config.appValidateUserIdTokenSSO');
  }

  get appCheckEnviroment(): string {
    return this.configService.get<string>('api-nestjs-config.appCheckEnviroment');
  }
}