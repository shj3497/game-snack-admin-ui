'use client';

import {getAppListByUser} from '@/lib/service/api-client/apps/apps';
import paths from '@/lib/utils/paths';
import useAlert from '@/lib/utils/useAlert';
import {Box, Button, Stack, TextField} from '@mui/material';
import {setCookie} from 'cookies-next';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {FC, useEffect} from 'react';
import {useForm} from 'react-hook-form';

interface Props {
  tokenExpired: boolean;
}

const SignInPage: FC<Props> = ({tokenExpired}) => {
  const {showAlert} = useAlert();
  const {register, handleSubmit} = useForm({
    defaultValues: {
      id: '',
      password: '',
    },
  });
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const res = await signIn('credentials', {
        id: data.id,
        password: data.password,
        redirect: false,
      });

      if (res?.ok) {
        // NOTE: redirect: false로 signIn을 호출하면 응답으로 session 객체를 받을 수 없습니다.
        // 직접 session을 fetch하여 확인해야 합니다.
        const session = await (await fetch('/api/auth/session')).json();

        if (Object.keys(session).length) {
          const data = await getAppListByUser({
            headers: {Authorization: `Bearer ${session.user.accessToken}`},
          });
          const appList = data.data;
          const appId = appList[0].appId;
          setCookie('appId', appId, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            secure: process.env.NODE_ENV !== 'development',
          });

          if (session.user.isTemporaryPassword) {
            router.push(
              paths.workspace.account.main + '?isTemporaryPassword=true',
            );
          } else {
            router.push(paths.workspace.main);
          }
        } else {
          // session이 없을 경우 기본 경로로 이동
          router.push(paths.workspace.main);
        }
      } else {
        showAlert('아이디 또는 비밀번호가 일치하지 않습니다.', {
          variant: 'error',
        });
      }
    } catch (error) {
      console.log(error);
      showAlert('로그인 중 오류가 발생했습니다.', {variant: 'error'});
    }
  };

  useEffect(() => {
    if (tokenExpired) {
      showAlert('인증 정보가 만료되었습니다.', {variant: 'error'});
    }
  }, [tokenExpired, showAlert]);

  return (
    <Stack
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          width="400px"
          height="400px"
          spacing={3}
          justifyContent="center"
          alignContent="center"
        >
          <Box display="flex" justifyContent="center">
            <img src="/FINFLOW_2.svg" alt="logo" />
          </Box>
          <TextField {...register('id')} label="Email address" fullWidth />

          <TextField
            {...register('password')}
            label="Password"
            type="password"
            fullWidth
          />

          <Button type="submit" variant="contained" fullWidth size="large">
            Sign in
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
export default SignInPage;
