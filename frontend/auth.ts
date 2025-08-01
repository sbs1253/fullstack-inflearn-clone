import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma';
import CredentialProvider from 'next-auth/providers/credentials';
import { comparePassword } from '@/lib/password-utils';

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

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user) {
          throw new Error('존재하지 않는 유저입니다.');
        }

        // 3. 비밀번호가 일치하는지 확인한다.
        const passwordMatch = comparePassword(credentials.password as string, user.hashedPassword as string);

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
  pages: {},
  callbacks: {},
});
