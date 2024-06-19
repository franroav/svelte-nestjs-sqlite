import { Module } from '@nestjs/common';
import configuration from './configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './configuration.service';

const envPath = ['.env'];

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: envPath,
      expandVariables: true,
      isGlobal: true,
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule { }
