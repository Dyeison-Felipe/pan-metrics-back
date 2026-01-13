export interface Hash {
  hash(value: string): Promise<string>;
  compareHash(value: string, valueHash: string): boolean;
}
