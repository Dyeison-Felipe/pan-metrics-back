
export type UserGenerateToken = {
  sub: string;
  username: string;
  email: string;
  role: string;
};

export type GenerateJwtToken = {
  token: string;
};

export type Options = {
  secret?: string;
  expiresIn?: number;
};

export type Payload = {
  sub: string;
  username: string;
  email?: string;
  iat: number;
  exp: number;
};

export interface JwtService {
  generateJwt(user: UserGenerateToken, options?: Options): Promise<GenerateJwtToken>;
  decodeJwt(jwt: string): Payload;
  verifyJwt(jwt: string): Promise<Payload | null>;
}
