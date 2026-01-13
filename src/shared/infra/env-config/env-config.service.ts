import { ConfigService } from '@nestjs/config';
import { EnvConfig } from '../../application/env-config/env-config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private readonly envConfigService: ConfigService) {}
  getSalts(): number {
    return +(this.envConfigService.get<string>('SALTS') as string);
  }
  getDbPort(): number {
    return +(this.envConfigService.get<string>('DB_PORT') as string);
  }
  getDbHost(): string {
    return this.envConfigService.get<string>('DB_HOST') as string;
  }
  getDbUser(): string {
    return this.envConfigService.get<string>('DB_USER') as string;
  }
  getDbPassword(): string {
    return this.envConfigService.get<string>('DB_PASSWORD') as string;
  }
  getDbName(): string {
    return this.envConfigService.get<string>('DB_NAME') as string;
  }
  getNodeEnv(): string {
    return this.envConfigService.get<string>('NODE_ENV') as string;
  }
  getAllowedOrigins(): string[] {
    return (this.envConfigService.get<string>('ALLOWED_ORIGINS')as string).split(',');
  }

  getPort(): number {
    return +(this.envConfigService.get<string>('PORT') as string);
  }
}
