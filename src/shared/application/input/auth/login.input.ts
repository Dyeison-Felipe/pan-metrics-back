import { CookieOptions } from "@shared/application/cookies/cookies";

export type LoginInput = {
    email: string;
  password: string;
  setCookie: (key: string, value: string, options?: CookieOptions) => void;
}