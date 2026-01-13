export interface Hash {
  hash(value: string): string;
  compareHash(value: string, valueHash: string): boolean;
}
