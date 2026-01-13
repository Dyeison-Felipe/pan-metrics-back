export interface EnvConfig {
  getDbPort(): number;
  getDbHost(): string;
  getDbUser(): string;
  getDbPassword(): string;
  getDbName(): string
  getPort(): number;
  getNodeEnv(): string;
  getAllowedOrigins(): string[]
  getSalts(): number;
}
