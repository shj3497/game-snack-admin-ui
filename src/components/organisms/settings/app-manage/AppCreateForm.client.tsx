'use client';

import AppManagementForm, {
  AppManagementFormType,
  schema,
} from './AppManagementForm.client';
import {useId} from 'react';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Stack} from '@mui/material';
import {
  getGetAppListQueryKey,
  useCreateApp,
} from '@/lib/service/api-client/apps/apps';
import {getQueryClient} from '@/lib/service/query-client';
import useAlert from '@/lib/utils/useAlert';
import {useRouter} from 'next/navigation';
import paths from '@/lib/utils/paths';
import {AppRequest} from '@/lib/service/api-client/model';

const AppCreateForm = () => {
  const formId = useId();
  const queryClient = getQueryClient();
  const {showAlert} = useAlert();
  const router = useRouter();
  const methods = useForm<AppManagementFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      key: '',
      hashKey: '',
      postbackUrl: '',
      postbackDomain: '',
      postbackSearchParams: [{key: '', value: ''}],
    },
  });

  const {mutate} = useCreateApp({
    mutation: {
      onSuccess: () => {
        showAlert({
          variant: 'success',
          message: '앱 생성이 완료되었습니다.',
        });
        queryClient.invalidateQueries({
          queryKey: getGetAppListQueryKey(),
        });
        router.push(paths.superspace.settings.app.main);
      },
      onError: (error: any) => {
        const message = error?.response?.message || '앱 생성에 실패했습니다.';
        showAlert({
          variant: 'error',
          message,
        });
      },
    },
  });

  const onSubmit: SubmitHandler<AppManagementFormType> = (data) => {
    const formData: AppRequest = {
      name: data.name,
      key: data.key,
      postbackUrl: data.postbackUrl,
      hashKey: data.hashKey,
      description: data.description,
    };
    mutate({data: formData});
  };

  return (
    <FormProvider {...methods}>
      <AppManagementForm
        id={formId}
        formType="CREATE"
        onSubmit={methods.handleSubmit(onSubmit)}
      />

      <Stack mt={4} alignItems="flex-end">
        <Button variant="contained" form={formId} type="submit">
          SUBMIT
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default AppCreateForm;
