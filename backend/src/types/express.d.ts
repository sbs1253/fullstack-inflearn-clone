export type JwtPayload = {
  sub: string;
  email?: string;
  name?: string;
  picture?: null;
  iat?: number;
};

declare global {
  namespace Express {
    interface User {
      sub: string;
      email?: string;
      name?: string;
      picture?: null;
      iat?: number;
    }
  }
}
declare module 'express-serve-static-core' {
  interface Request {
    user: Express.User; // ✅ 옵셔널 제거(필수)
  }
}
export {};
