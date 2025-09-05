import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type {NextAuthOptions, User} from 'next-auth';
import {getServerSession} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {adminAuthLogin} from '@/lib/service/api-client/admin-auth/admin-auth';

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const authConfig = {
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        // 로그인 폼에서 받을 필드 정의
        id: {
          label: '아이디',
          type: 'email',
          placeholder: 'test@example.com',
        },
        password: {label: '비밀번호', type: 'password'},
      },
      async authorize(credentials, req) {
        // 여기에 백엔드 API서버와 통신하여 사용자 인증로직 구현
        if (!credentials?.id || !credentials.password) return null;
        const {id, password} = credentials;
        try {
          //TODO API
          const res = await adminAuthLogin({
            username: id,
            password,
          });
          const isTemporaryPassword = res.data.isTemporaryPassword;
          console.log('Authorize res', res.data);

          const result = {
            id: res.data.username,
            name: res.data.fullName,
            email: res.data.email,
            role: res.data.roles[0].role,
            accessToken: res.data.token,
            isTemporaryPassword,
          };
          // console.log('authorize res', res);
          return result;
        } catch (error) {
          console.log('Authorize error', error);
          return null;
        }
      },
    }),
  ], // rest of your config
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({token, user}) {
      // `user` 파라미터는 authorize에서 반환한 BackendUser 타입의 객체입니다.
      // `token` 파라미터는 next-auth.d.ts에서 확장한 JWT 타입입니다.
      // console.log('======== jwt start ========');
      // console.log('token', token);
      // console.log('user', user);
      // console.log('======== jwt end ========');
      if (user) {
        // 최초 로그인 시
        const backendUser = user as User; // 타입 단언 (또는 user가 이미 BackendUser 타입으로 추론될 수 있음)
        token.id = backendUser.id;
        token.name = backendUser.name;
        token.email = backendUser.email;
        token.role = backendUser.role;
        token.accessToken = backendUser.accessToken;
        token.isTemporaryPassword = backendUser.isTemporaryPassword;

        if (backendUser.refreshToken) {
          token.refreshToken = backendUser.refreshToken;
        }
      }
      return token;
    },
    async session({session, token}) {
      // `token` 파라미터는 jwt 콜백에서 반환된 확장된 JWT 타입입니다.
      // `session.user`는 next-auth.d.ts에서 확장한 Session['user'] 타입입니다.
      // console.log('======== session start ========');
      // console.log('session', session);
      // console.log('token', token);
      // console.log('======== session end ========');
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
        session.user.isTemporaryPassword = token.isTemporaryPassword;
      }
      return session;
    },
    async signIn({user, account, profile, email, credentials}) {
      // console.log('======== signIn start ========');
      // console.log(user);
      // console.log('======== signIn end ========');
      return true;
    },
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig);
}
