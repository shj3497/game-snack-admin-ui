'use client';

import {
  useGetAppList,
  useGetAppListSuspense,
} from '@/lib/service/api-client/apps/apps';
import {UserRole} from '@/lib/types/user-role';
import {
  Card,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import {FC, HTMLAttributes, Suspense, useId} from 'react';
import {Controller} from 'react-hook-form';
import {useFormContext} from 'react-hook-form';
import zod from 'zod';

interface Props extends HTMLAttributes<HTMLFormElement> {
  formType?: 'create' | 'update';
  readOnlyValues?: ReadOnlyValue[];
}

const StyledMenuItem = styled(MenuItem)`
  border-radius: 0;
`;

export const schema = zod
  .object({
    formType: zod.enum(['create', 'update']).optional(),
    username: zod.string().min(1, '사용자 ID를 입력해주세요.'),
    password: zod.string().min(1, '비밀번호를 입력해주세요.'),
    appId: zod.string(),
    email: zod
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('이메일 형식이 아닙니다.'),
    fullName: zod.string().min(1, '이름을 입력해주세요.'),
    phone: zod.string().min(1, '전화번호를 입력해주세요.'),
    role: zod
      .string()
      .min(1, 'Role을 선택해주세요.')
      .transform((val) => val),
  })
  .superRefine((data, ctx) => {
    if (data.formType === 'create') {
      if (!data.password || data.password.length === 0) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: '비밀번호를 입력해주세요.',
          path: ['password'], // 어떤 필드에 대한 에러인지 명시
        });
      } else if (data.password.length < 4) {
        // 예시: 최소 8자 이상
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: '비밀번호는 8자 이상이어야 합니다.',
          path: ['password'],
        });
      }

      if (!data.username || data.username.length === 0) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: '사용자 ID를 입력해주세요.',
        });
      }
    }
    if (data.role !== 'SUPER_ADMIN') {
      if (!data.appId || data.appId.length === 0) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: '앱 ID를 선택해주세요.',
          path: ['appId'],
        });
      }
    }
  });

export type UserManagementFormValues = zod.infer<typeof schema>;
export type ReadOnlyValue = keyof UserManagementFormValues;

const UserManagementForm: FC<Props> = ({
  formType = 'create',
  readOnlyValues,
  ...props
}) => {
  const id = useId();
  const {
    register,
    control,
    watch,
    formState: {errors},
    setValue,
  } = useFormContext<UserManagementFormValues>();

  return (
    <form {...props}>
      <Stack width="100%" spacing={4}>
        <Card sx={{p: 2}}>
          <Typography variant="subtitle2">사용자 계정</Typography>
          <Stack mt={3} spacing={2}>
            <TextField
              {...register('username')}
              label="id *"
              size="small"
              fullWidth
              helperText={errors.username?.message}
              error={!!errors.username}
              disabled={readOnlyValues?.includes('username')}
            />
            {formType === 'create' && (
              <TextField
                {...register('password')}
                label="password *"
                size="small"
                fullWidth
                helperText={errors.password?.message}
                error={!!errors.password}
                disabled={readOnlyValues?.includes('password')}
              />
            )}

            <FormControl error={!!errors.role} fullWidth>
              <InputLabel id={id} size="small">
                role *
              </InputLabel>
              <Controller
                control={control}
                name="role"
                render={({field}) => (
                  <Select
                    {...field}
                    labelId={id}
                    label="role *"
                    size="small"
                    fullWidth
                    disabled={readOnlyValues?.includes('role')}
                    onChange={(event) => {
                      if (event.target.value === 'SUPER_ADMIN') {
                        setValue('appId', '');
                      }
                      field.onChange(event);
                    }}
                  >
                    <StyledMenuItem value="SUPER_ADMIN">
                      SUPER_ADMIN
                    </StyledMenuItem>
                    <StyledMenuItem value="ADMIN">ADMIN</StyledMenuItem>
                    <StyledMenuItem value="MANAGER">MANAGER</StyledMenuItem>
                  </Select>
                )}
              />
              {!!errors.role && (
                <FormHelperText>{errors.role.message}</FormHelperText>
              )}
            </FormControl>

            <Suspense fallback={<AppSelectSkeleton />}>
              <AppSelect disabled={watch('role') === 'SUPER_ADMIN'} />
            </Suspense>
          </Stack>
        </Card>
        <Card sx={{p: 2}}>
          <Typography variant="subtitle2">사용자 정보</Typography>
          <Stack mt={3} spacing={2}>
            <TextField
              {...register('fullName')}
              label="이름 *"
              size="small"
              fullWidth
              helperText={errors.fullName?.message}
              error={!!errors.fullName}
              disabled={readOnlyValues?.includes('fullName')}
            />

            <TextField
              {...register('email')}
              label="email *"
              size="small"
              fullWidth
              helperText={errors.email?.message}
              error={!!errors.email}
              disabled={readOnlyValues?.includes('email')}
            />

            <TextField
              {...register('phone')}
              label="phone *"
              size="small"
              fullWidth
              placeholder="010-1234-5678"
              helperText={errors.phone?.message}
              error={!!errors.phone}
              disabled={readOnlyValues?.includes('phone')}
            />
          </Stack>
        </Card>
      </Stack>
    </form>
  );
};

const AppSelect = ({disabled}: {disabled: boolean}) => {
  const id = useId();
  const {
    control,
    formState: {errors},
  } = useFormContext<UserManagementFormValues>();

  const {data: appList} = useGetAppListSuspense({page: 0, size: 100});
  const appListData = appList.data?.content?.map((item) => ({
    appId: item.appId,
    appName: item.appName,
  }));

  return (
    <FormControl error={!!errors.appId} disabled={disabled}>
      <InputLabel id={id} size="small">
        app *
      </InputLabel>
      <Controller
        control={control}
        name="appId"
        render={({field}) => (
          <Select
            {...field}
            labelId={id}
            label="app *"
            size="small"
            fullWidth
            disabled={disabled}
          >
            {appListData?.map((item) => (
              <StyledMenuItem key={item.appId} value={item.appId}>
                {item.appName}
              </StyledMenuItem>
            ))}
          </Select>
        )}
      />
      {!!errors.appId && (
        <FormHelperText>{errors.appId.message}</FormHelperText>
      )}
    </FormControl>
  );
};

const AppSelectSkeleton = () => {
  const id = useId();
  return (
    <FormControl fullWidth>
      <InputLabel id={id} size="small">
        app *
      </InputLabel>
      <Select labelId={id} label="app *" size="small" fullWidth></Select>
    </FormControl>
  );
};

export default UserManagementForm;
