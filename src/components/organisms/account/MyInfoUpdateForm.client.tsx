'use client';

import {
  useAdminAuthGetMyInfoSuspense,
  getAdminAuthGetMyInfoQueryKey,
  useAdminAuthUpdateUserMyInfo,
} from '@/lib/service/api-client/admin-auth/admin-auth';
import {getQueryClient} from '@/lib/service/query-client';
import useAppId from '@/lib/store/useAppId';
import paths from '@/lib/utils/paths';
import useAlert from '@/lib/utils/useAlert';
import {zodResolver} from '@hookform/resolvers/zod';
import {Box, Button, Stack, TextField, Tooltip} from '@mui/material';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import zod from 'zod';

interface Props {
  isTemporaryPassword?: boolean;
}

const schema = zod.object({
  username: zod.string(),
  fullName: zod.string().min(1, '이름을 입력해주세요.'),
  email: zod
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('이메일 형식이 아닙니다.'),
  phone: zod.string().min(1, '전화번호를 입력해주세요.'),
  oldPassword: zod.string().min(1, '현재 비밀번호를 입력해주세요.'),
  password: zod.string().min(1, '새 비밀번호를 입력해주세요.'),
});

type FormValues = zod.infer<typeof schema>;

const MyInfoUpdateForm: FC<Props> = ({isTemporaryPassword}) => {
  const session = useSession();
  const router = useRouter();
  const isSuperAdmin = session.data?.user.role === 'SUPER_ADMIN';

  const storedAppId = useAppId((store) => store.appId);
  const {showAlert} = useAlert();
  const queryClient = getQueryClient();

  const appId = isSuperAdmin ? 'super' : storedAppId;

  const {
    data: {data: myInfo},
  } = useAdminAuthGetMyInfoSuspense(appId, {
    query: {
      staleTime: 30 * 60 * 1000, //30분
      gcTime: 30 * 60 * 1000, //30분
    },
  });

  const {register, handleSubmit} = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: myInfo?.username || '',
      fullName: myInfo?.fullName || '',
      email: myInfo?.email || '',
      phone: myInfo?.phone || '',
      oldPassword: '',
      password: '',
    },
  });

  const {mutate, isPending} = useAdminAuthUpdateUserMyInfo({
    mutation: {
      onSuccess: () => {
        showAlert({
          variant: 'success',
          message: '회원 정보가 수정되었습니다.',
        });
        queryClient.invalidateQueries({
          queryKey: getAdminAuthGetMyInfoQueryKey(appId),
        });
        if (isTemporaryPassword) {
          router.push(paths.workspace.main);
        }
      },
      onError: (error: any) => {
        console.log(error);
        const message =
          error?.response?.message || '회원 정보 수정에 실패하였습니다.';
        showAlert({
          variant: 'error',
          message,
        });
      },
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const {username, ...rest} = data;
    mutate({
      appId,
      data: rest,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack width="100%" spacing={2} mb={3}>
        <Stack width="100%" spacing={2} direction="row">
          <Tooltip title="아이디는 수정할 수 없습니다." placement="top-start">
            <TextField
              {...register('username', {
                disabled: true,
              })}
              label="id"
              fullWidth
              slotProps={{input: {readOnly: true, disabled: true}}}
              disabled
            />
          </Tooltip>
          <TextField {...register('fullName')} label="이름" fullWidth />
        </Stack>

        <Stack width="100%" spacing={2} direction="row">
          <TextField {...register('email')} label="이메일" fullWidth />
          <TextField
            {...register('phone')}
            label="연락처"
            fullWidth
            placeholder="010-1234-5678"
          />
        </Stack>

        <Stack width="100%" spacing={2} direction="row">
          <TextField
            {...register('oldPassword')}
            label="old password"
            fullWidth
            type="password"
          />
          <TextField
            {...register('password')}
            label="new password"
            fullWidth
            type="password"
          />
        </Stack>
      </Stack>

      <Box display="flex" justifyContent="flex-end">
        <Button type="submit" variant="contained" loading={isPending}>
          수정하기
        </Button>
      </Box>
    </form>
  );
};

export default MyInfoUpdateForm;
