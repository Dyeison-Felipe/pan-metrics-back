import { Injectable } from '@nestjs/common';
import { Hash } from '../../application/hash/hash';
import * as bcrypt from 'bcrypt';
import { EnvConfigService } from '../env-config/env-config.service';

@Injectable()
export class HashService implements Hash {
  constructor(private readonly configService: EnvConfigService) {}
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
