'use client';

import {FC, useId} from 'react';
import UserManagementForm, {
  schema,
  UserManagementFormValues,
} from './UserManagementForm.client';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  getAdminAuthListQueryKey,
  useAdminAuthRegisterApp,
} from '@/lib/service/api-client/admin-auth/admin-auth';
import {Button, Stack} from '@mui/material';
import {getQueryClient} from '@/lib/service/query-client';
import useAppId from '@/lib/store/useAppId';
import useAlert from '@/lib/utils/useAlert';
import {useRouter} from 'next/navigation';

interface Props {}

const UserCreateForm: FC<Props> = () => {
  const router = useRouter();
  const {showAlert} = useAlert();
  const appId = useAppId((store) => store.appId);
  const queryClient = getQueryClient();
  const formId = useId();
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      formType: 'create',
      username: '',
      password: '',
      email: '',
      fullName: '',
      role: '',
    },
  });
  const {handleSubmit} = methods;

  const {mutate, isPending} = useAdminAuthRegisterApp({
    mutation: {
      onSuccess: () => {
        showAlert({
          variant: 'success',
          message: '사용자 등록이 완료되었습니다.',
        });
        queryClient.invalidateQueries({
          queryKey: getAdminAuthListQueryKey(appId),
        });
        router.back();
      },
      onError: (error: any) => {
        const message = error.detail.message || '사용자 등록에 실패하였습니다.';
        showAlert({
          variant: 'error',
          message: message,
        });
      },
    },
  });

  const onSubmit: SubmitHandler<UserManagementFormValues> = async (data) => {
    const {formType, ...rest} = data;
    mutate({appId, data: rest});
  };
  return (
    <Stack px={2} pb={4}>
      <FormProvider {...methods}>
        <UserManagementForm id={formId} onSubmit={handleSubmit(onSubmit)} />
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

export default UserCreateForm;
