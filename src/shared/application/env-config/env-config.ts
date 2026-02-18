export interface EnvConfig {
  getCookieSecret(): string;
  getCookieSameSite(): string;
  getCookieSecure(): boolean;
  getCookieDomain(): string;
  getJwtSecret(): string;
  getJwtExpiresInSeconds(): number;
  getDbPort(): number;
  getDbHost(): string;
  getDbUser(): string;
  getDbPassword(): string;
  getDbName(): string
  getPort(): number;
  getNodeEnv(): string;
  getAllowedOrigins(): string[]
  getSalts(): number;
  getSchema(): string;
}
