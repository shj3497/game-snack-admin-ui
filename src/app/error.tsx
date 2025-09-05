'use client';

import {useEffect} from 'react';
import {signOut} from 'next-auth/react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useRouter} from 'next/navigation';

// 실제 백엔드 에러 응답과 일치하는 타입 정의
interface BackendApiError {
  status?: number;
  title?: string;
  detail?: {
    code?: string;
    message?: string;
  };

  message?: string;
}

export default function Error({
  error,
  reset,
}: {
  error: Error & BackendApiError;
  reset: () => void;
}) {
  const router = useRouter();

  let apiError: BackendApiError = {};

  // error.message가 문자열인지 확인하고 처리합니다.
  if (typeof error.message === 'string') {
    try {
      // 1. JSON.parse 시도
      apiError = JSON.parse(error.message);
    } catch (e) {
      // 2. JSON 파싱 실패 시, 정규식으로 파싱 시도
      // ES2018 미만 환경 호환을 위해 Named Capturing Group을 사용하지 않도록 수정
      const errorMatch = error.message.match(
        /status:\s*(\d+)|title:\s*'([^']*)'|detail:\s*\{[^{}]*message:\s*'([^']*)'/,
      );
      const parsedFromRegex: BackendApiError = {};
      if (errorMatch) {
        if (errorMatch[1]) {
          parsedFromRegex.status = parseInt(errorMatch[1], 10);
        }
        if (errorMatch[2]) {
          parsedFromRegex.title = errorMatch[2];
        }
        if (errorMatch[3]) {
          parsedFromRegex.detail = {message: errorMatch[3]};
        }
      }
      apiError = parsedFromRegex;
    }
  }

  // 파싱된 정보와 원래 에러 객체의 정보를 병합하여 최종 에러 객체를 생성합니다.
  const finalError = {
    ...error,
    ...apiError,
    detail: apiError.detail || error.detail,
  };

  const errorStatus = finalError.status;
  const isUnauthorized = errorStatus === 401;
  const isAccessDenied = finalError.message?.includes('access-denied');

  useEffect(() => {
    // 서버에서 발생한 401 에러를 여기서 감지합니다.
    if (isUnauthorized) {
      console.error(
        '서버 렌더링 중 인증 에러(401) 발생. 로그아웃 후 로그인 페이지로 이동합니다.',
      );
      signOut({callbackUrl: '/auth/signin?tokenExpired=true'});
    }
  }, [isUnauthorized]); // isUnauthorized 값 변경에 따라 실행되도록 수정

  const UnauthorizedContent = () => {
    return (
      <>
        <Typography variant="h4" component="h1" gutterBottom>
          {finalError.detail?.message || '인증 정보가 만료되었습니다.'}
        </Typography>
        <Typography variant="body1" sx={{mb: 3}}>
          로그인 페이지로 이동합니다...
        </Typography>
      </>
    );
  };

  const AccessDeniedContent = () => {
    return (
      <>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{color: 'error.main'}}
        >
          {'잘못된 접근입니다.'}
        </Typography>
        <Typography variant="body1" sx={{mb: 3}}>
          {'접근이 제한된 페이지입니다.'}
        </Typography>
        <Button variant="contained" onClick={() => router.back()}>
          되돌아가기
        </Button>
      </>
    );
  };

  const DefaultContent = () => {
    return (
      <>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{color: 'error.main'}}
        >
          {finalError.title || '오류가 발생했습니다'}
        </Typography>
        <Typography variant="body1" sx={{mb: 3}}>
          {finalError.detail?.message ||
            finalError.message ||
            '페이지를 로드하는 중 예상치 못한 문제가 발생했습니다.'}
        </Typography>
        <Button variant="contained" onClick={() => reset()}>
          다시 시도
        </Button>
      </>
    );
  };

  const Content = () => {
    if (isUnauthorized) {
      return <UnauthorizedContent />;
    }
    if (isAccessDenied) {
      return <AccessDeniedContent />;
    }
    return <DefaultContent />;
  };

  // 그 외 다른 에러의 경우
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Content />
    </Box>
  );
}
