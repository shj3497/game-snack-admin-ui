'use client';

import {FC, useId} from 'react';
import UserManagementForm, {
  ReadOnlyValue,
  schema,
  UserManagementFormValues,
} from './UserManagementForm.client';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  getAdminAuthGetUserQueryKey,
  getAdminAuthListQueryKey,
  useAdminAuthGetUserSuspense,
  useAdminAuthUpdateUserRole,
} from '@/lib/service/api-client/admin-auth/admin-auth';
import useAppId from '@/lib/store/useAppId';
import {Button, Stack} from '@mui/material';
import useAlert from '@/lib/utils/useAlert';
import {getQueryClient} from '@/lib/service/query-client';
import {useRouter} from 'next/navigation';
import UserStatusForm from './UserStatusForm.client';

interface Props {
  userId: string;
}

const UserUpdateForm: FC<Props> = ({userId}) => {
  const {showAlert} = useAlert();
  const appId = useAppId((store) => store.appId);

  const router = useRouter();
  const queryClient = getQueryClient();
  const formId = useId();

  const {
    data: {data},
  } = useAdminAuthGetUserSuspense(appId, userId);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      formType: 'update',
      username: data.username,
      password: '', // 업데이트 시 비밀번호는 공백으로 두면 수정하지 않음
      email: data.email,
      phone: data.phone || '',
      fullName: data.fullName,
      role: data.roles[0].role,
    },
  });
  const {
    handleSubmit,
    formState: {errors},
  } = methods;

  const {mutate, isPending} = useAdminAuthUpdateUserRole({
    mutation: {
      onSuccess: () => {
        showAlert({
          variant: 'success',
          message: '사용자 정보가 업데이트되었습니다.',
        });
        queryClient.invalidateQueries({
          queryKey: getAdminAuthListQueryKey(appId),
        });
        queryClient.invalidateQueries({
          queryKey: getAdminAuthGetUserQueryKey(appId, userId),
        });
        router.back();
      },
      onError: (error: any) => {
        const message =
          error.detail?.message || '사용자 정보 업데이트에 실패하였습니다.';

        showAlert({
          variant: 'error',
          message,
        });
      },
    },
  });

  const onSubmit: SubmitHandler<UserManagementFormValues> = async (data) => {
    const {formType, role, ...rest} = data;

    mutate({appId, userId, data: {role}});
  };

  const readOnlyValues: ReadOnlyValue[] = [
    'username',
    'email',
    'fullName',
    'phone',
  ];

  return (
    <Stack px={2} pb={4}>
      <FormProvider {...methods}>
        <UserManagementForm
          id={formId}
          onSubmit={handleSubmit(onSubmit)}
          formType="update"
          readOnlyValues={readOnlyValues}
        />
        <UserStatusForm userId={userId} enabled={data.enabled} mt={4} />
        <Stack mt={2}>
          <Button
            form={formId}
            type="submit"
            variant="contained"
            loading={isPending}
          >
            SUBMIT
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
};
export default UserUpdateForm;
