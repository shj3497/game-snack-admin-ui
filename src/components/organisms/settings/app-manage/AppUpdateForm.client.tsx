'use client';

import AppManagementForm, {
  AppManagementFormType,
  schema,
} from './AppManagementForm.client';
import {FC, useId} from 'react';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Stack} from '@mui/material';
import {
  getGetAppDetailQueryKey,
  useGetAppDetailSuspense,
  useUpdateApp,
} from '@/lib/service/api-client/apps/apps';
import {getGetAppListQueryKey} from '@/lib/service/api-client/apps/apps';
import queryString from 'query-string';
import {getQueryClient} from '@/lib/service/query-client';
import useAlert from '@/lib/utils/useAlert';
import {AppUpdateRequest} from '@/lib/service/api-client/model';
import {useRouter} from 'next/navigation';
import paths from '@/lib/utils/paths';

interface Props {
  appId: string;
}

const AppUpdateForm: FC<Props> = ({appId}) => {
  const formId = useId();
  const queryClient = getQueryClient();
  const {showAlert} = useAlert();
  const router = useRouter();

  const {
    data: {data},
  } = useGetAppDetailSuspense(appId, {
    query: {
      staleTime: 5 * 60 * 1000, // 5분
      gcTime: 5 * 60 * 1000, // 5분
    },
  });

  const {appName, postbackUrl, hashKey, description} = data;
  const parsedPostbackUrl = queryString.parseUrl(postbackUrl || '');
  const postbackDomain = parsedPostbackUrl.url as string;
  const postbackSearchParams = Object.entries(parsedPostbackUrl.query).map(
    ([key, value]) => ({
      key,
      value: (value as string).replaceAll('{', '').replaceAll('}', ''),
    }),
  );

  const {mutate} = useUpdateApp({
    mutation: {
      onSuccess: () => {
        showAlert({
          variant: 'success',
          message: '앱 정보가 수정되었습니다.',
        });
        queryClient.invalidateQueries({
          queryKey: getGetAppDetailQueryKey(appId),
        });
        queryClient.invalidateQueries({
          queryKey: getGetAppListQueryKey(),
        });
        router.push(paths.superspace.settings.app.detail(appId));
      },
      onError: (error: any) => {
        const message =
          error?.response?.message || '앱 정보 수정에 실패했습니다.';
        showAlert({
          variant: 'error',
          message,
        });
      },
    },
  });

  const methods = useForm<AppManagementFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: appName,
      description,
      key: appId,
      hashKey,
      postbackUrl,
      postbackDomain,
      postbackSearchParams,
    },
  });

  const onSubmit: SubmitHandler<AppManagementFormType> = (data) => {
    const formData: AppUpdateRequest = {
      name: data.name,
      postbackUrl: data.postbackUrl,
      hashKey: data.hashKey,
      description: data.description,
    };
    mutate({appId, data: formData});
  };

  return (
    <FormProvider {...methods}>
      <AppManagementForm
        id={formId}
        formType="UPDATE"
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

export default AppUpdateForm;
