import { Inject, Injectable } from '@nestjs/common';
import { HashService } from '../../application/hash/hash.service';
import * as bcrypt from 'bcrypt';
import { EnvConfigService } from '../env-config/env-config.service';
import { PROVIDERS } from '@/shared/application/constants/providers';

export class HashServiceImpl implements HashService {
  constructor(
    @Inject(PROVIDERS.ENV_CONFIG_SERVICE)
    private readonly configService: EnvConfigService) {}
  async hash(value: string): Promise<string> {
    const salts = this.configService.getSalts();

    const hashed = await bcrypt.hash(value, salts);

    return hashed;
  }
  compareHash(value: string, valueHash: string): boolean {
    const compare = bcrypt.compareSync(value, valueHash);
    return compare;
  }
}
