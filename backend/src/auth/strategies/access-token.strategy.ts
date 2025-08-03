import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  email?: string;
  name?: string;
  picture?: null;
  iat?: number;
  exp?: number;
  jti?: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET!,
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: JwtPayload) {
    console.log('JWT 토큰 검증 중...', payload);
    console.log(
      '토큰 만료 시간:',
      payload.exp ? new Date(payload.exp * 1000) : '없음',
    );
    console.log('현재 시간:', new Date());

    // NextAuth.js에서 생성된 토큰의 경우 sub가 없을 수 있음
    if (!payload.sub && !payload.email) {
      console.log('유효하지 않은 토큰: sub 또는 email이 없음');
      return null;
    }

    console.log('토큰 검증 성공');
    return payload;
  }
}
