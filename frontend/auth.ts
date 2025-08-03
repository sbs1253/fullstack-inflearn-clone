import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma';
import CredentialProvider from 'next-auth/providers/credentials';
import { comparePassword } from '@/lib/password-utils';
import * as jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';
export const { handlers, auth, signIn, signOut } = NextAuth({
  useSecureCookies: process.env.NODE_ENV === 'production',
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: { label: '이메일', type: 'email', placeholder: '이메일 입력' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        // 1. 모든 값들이 정상적으로 들어왔는가?

        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('이메일과 비밀번호를 입력해주세요.');
        }

        // 2. DB에서 유저를 찾는다.
        console.log('로그인 시도 이메일:', credentials.email);

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user) {
          console.log('유저를 찾을 수 없음:', credentials.email);
          throw new Error('존재하지 않는 유저입니다.');
        }

        console.log('유저 찾음:', user.email);
        console.log('저장된 해시:', user.hashedPassword?.substring(0, 20) + '...');

        // 3. 비밀번호가 일치하는지 확인한다.
        const passwordMatch = comparePassword(credentials.password as string, user.hashedPassword as string);

        console.log('비밀번호 매치 결과:', passwordMatch);

        if (!passwordMatch) {
          throw new Error('비밀번호가 일치하지 않습니다.');
        }

        return user; // 인증 성공 시 유저 객체 반환
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    encode: async ({ token, secret }) => {
      console.log('JWT 토큰 생성 중...', token);
      const jwtToken = jwt.sign(token as jwt.JwtPayload, secret as string);
      console.log('생성된 JWT 토큰:', jwtToken);
      return jwtToken;
    },
    decode: async ({ token, secret }) => {
      console.log('JWT 토큰 디코딩 중...', token);
      try {
        const decoded = jwt.verify(token as string, secret as string) as JWT;
        console.log('디코딩된 토큰:', decoded);
        return decoded;
      } catch (error) {
        console.error('JWT 토큰 디코딩 실패:', error);
        throw error;
      }
    },
  },
  pages: {},
  callbacks: {},
});
