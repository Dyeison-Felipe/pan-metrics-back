import { EnvConfig } from "../../application/env-config/env-config";
import { Hash } from "../../application/hash/hash";

export class HashService implements Hash {

  constructor(private readonly configService: EnvConfig) {

  }
  hash(value: string): string {
    throw new Error("Method not implemented.");
  }
  compareHash(value: string, valueHash: string): boolean {
    throw new Error("Method not implemented.");
  }

}