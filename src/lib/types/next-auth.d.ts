import NextAuth, {DefaultSession} from 'next-auth';

export interface CustomUser {
  id: string;
  name: string;
  email: string;
  role?: UserRole; // 예를 들어 role 속성 추가
  accessToken: string;
  refreshToken?: string;
  isTemporaryPassword?: boolean;
}

type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | (string & {});

// 사용자 정의 User 타입을 정의합니다.
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      role?: CustomUser['role'];
      // accessToken은 보안상 session.user에 직접 노출하지 않는 것이 좋을 수 있습니다.
      // 필요하다면 별도의 API 라우트를 통해 서버에서만 사용하도록 하거나,
      // 매우 제한적인 경우에만 포함시키세요.
      accessToken?: string;
      isTemporaryPassword?: boolean;
    };
  }

  interface User extends CustomUser {}
}

// NextAuth의 JWT 타입도 확장할 수 있습니다.
declare module 'next-auth/jwt' {
  interface JWT extends CustomUser {}
}
