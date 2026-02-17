export type Payload = {
  
}

export interface JwtService {
  generateToken(): Promise<string>;
}