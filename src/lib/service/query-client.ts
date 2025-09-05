import {
  MutationCache,
  QueryCache,
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query';
import {signOut} from 'next-auth/react';

interface BackendApiError {
  status?: number;
  title?: string;
  detail?: {
    code?: string;
    message?: string;
  };
}

const handleApiError = (error: unknown) => {
  const apiError = error as BackendApiError;

  // 401 Unauthorized 에러가 발생했을 때만 로그아웃을 처리합니다.
  if (apiError?.status === 401) {
    // 이 코드는 클라이언트에서만 실행되어야 하므로, window 객체의 존재를 확인합니다.
    // 또한, 현재 페이지가 이미 로그인 페이지라면 무한 리디렉션을 방지합니다.
    if (
      typeof window !== 'undefined' &&
      window.location.pathname !== '/auth/signin'
    ) {
      console.error('인증이 만료되었습니다. 로그인 페이지로 이동합니다.');

      // next-auth의 signOut 함수를 호출하여 세션을 클리어하고,
      // 완료되면 로그인 페이지로 리디렉션합니다.
      signOut({callbackUrl: '/auth/signin?tokenExpired=true'});
    }
  }
};
function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: handleApiError,
    }),
    mutationCache: new MutationCache({
      onError: handleApiError,
    }),
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, // 1 minutes
        retry: (failureCount, error) => {
          const apiError = error as BackendApiError;
          if (apiError?.status === 401) {
            return false; // 401 에러는 재시도하지 않음
          }
          // 그 외의 에러는 기존 설정대로 1회만 재시도합니다.
          return failureCount < 1;
        },
        throwOnError: true,
      },
      mutations: {
        throwOnError: false,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}

export {getQueryClient};
