export interface JwtPayload {
  sub: string;
  email: string;
  name?: string;
  picture?: string | null;
  iat?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
