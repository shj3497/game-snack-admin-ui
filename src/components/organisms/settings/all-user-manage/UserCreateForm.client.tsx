'use client';

import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import UserManagementForm, {
  schema,
  UserManagementFormValues,
} from './UserManagementForm.client';
import {Button, Stack} from '@mui/material';
import {useId} from 'react';
import {getQueryClient} from '@/lib/service/query-client';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  getAdminAuthListAllUsersQueryKey,
  useAdminAuthRegister,
} from '@/lib/service/api-client/admin-auth/admin-auth';
import {UserRole} from '@/lib/types/user-role';
import useAlert from '@/lib/utils/useAlert';
import {useRouter} from 'next/navigation';

const UserCreateForm = () => {
  const formId = useId();
  const {showAlert} = useAlert();
  const router = useRouter();
  const queryClient = getQueryClient();
  const methods = useForm<UserManagementFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      formType: 'create',
      username: '',
      password: '',
      email: '',
      fullName: '',
      role: '',
      appId: '',
      phone: '',
    },
  });

  const {handleSubmit} = methods;

  const {mutate, isPending} = useAdminAuthRegister({
    mutation: {
      onSuccess: () => {
        showAlert({
          variant: 'success',
          message: '사용자 등록이 완료되었습니다.',
        });
        queryClient.invalidateQueries({
          queryKey: getAdminAuthListAllUsersQueryKey(),
        });
        router.back();
      },
      onError: (error: any) => {
        const message =
          error.detail?.message || '사용자 등록에 실패하였습니다.';
        showAlert({
          variant: 'error',
          message: message,
        });
      },
    },
  });

  const onSubmit: SubmitHandler<UserManagementFormValues> = (data) => {
    mutate({
      data: {
        username: data.username,
        password: data.password,
        email: data.email,
        fullName: data.fullName,
        role: data.role as UserRole,
        appId: data.appId,
        phone: data.phone,
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <UserManagementForm id={formId} onSubmit={handleSubmit(onSubmit)} />

      <Stack mt={4} alignItems="flex-end">
        <Button
          variant="contained"
          form={formId}
          type="submit"
          loading={isPending}
        >
          SUBMIT
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default UserCreateForm;
