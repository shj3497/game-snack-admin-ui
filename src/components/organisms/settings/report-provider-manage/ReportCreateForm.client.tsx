'use client';

import {Button, Stack} from '@mui/material';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import ReportManagementForm, {
  ReportManagementFormValues,
  schema,
} from './ReportManagementForm.client';
import {useId} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {getQueryClient} from '@/lib/service/query-client';
import {useRouter} from 'next/navigation';
import useAlert from '@/lib/utils/useAlert';
import useAppId from '@/lib/store/useAppId';
import {
  getGetReportProviderListQueryKey,
  useCreateReportProvider,
} from '@/lib/service/api-client/reports/reports';
import {ReportProviderType} from '@/components/molecules/ReportProviderSelect.client';
import {AdProviderType} from '@/components/molecules/AdTypeSelect.client';
import paths from '@/lib/utils/paths';

const ReportCreateForm = () => {
  const formId = useId();
  const appId = useAppId((store) => store.appId);
  const {showAlert} = useAlert();
  const router = useRouter();
  const queryClient = getQueryClient();

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      providerType: '',
      reportProviderType: '',
      reportKey: '',
      commission: 0,
    },
  });

  const {mutate} = useCreateReportProvider({
    mutation: {
      onSuccess: () => {
        showAlert({
          variant: 'success',
          message: '리포트 제공자 등록이 완료되었습니다.',
        });
        queryClient.invalidateQueries({
          queryKey: getGetReportProviderListQueryKey(appId),
        });
        router.back();
      },
      onError: (error: any) => {
        const message =
          error.detail?.message || '리포트 제공자 등록에 실패하였습니다.';
        showAlert({
          variant: 'error',
          message,
        });
      },
    },
  });

  const onSubmit: SubmitHandler<ReportManagementFormValues> = (data) => {
    mutate({
      appId,
      data: {
        providerType: data.providerType as AdProviderType,
        reportProviderType: data.reportProviderType as ReportProviderType,
        reportKey: data.reportKey,
        commission: data.commission,
      },
    });
  };

  return (
    <Stack px={2} pb={4}>
      <FormProvider {...methods}>
        <ReportManagementForm
          id={formId}
          formType="CREATE"
          onSubmit={methods.handleSubmit(onSubmit)}
        />
        <Stack mt={2}>
          <Button variant="contained" form={formId} type="submit">
            SUBMIT
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export default ReportCreateForm;
