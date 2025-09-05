'use client';

import {Button, Stack} from '@mui/material';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import ReportManagementForm from './ReportManagementForm.client';
import {FC, useId} from 'react';
import useAppId from '@/lib/store/useAppId';
import useAlert from '@/lib/utils/useAlert';
import {useRouter} from 'next/navigation';
import {getQueryClient} from '@/lib/service/query-client';
import {zodResolver} from '@hookform/resolvers/zod';
import {schema} from './ReportManagementForm.client';
import {ReportManagementFormValues} from './ReportManagementForm.client';
import {
  getGetReportProviderDetailQueryKey,
  getGetReportProviderListQueryKey,
  useGetReportProviderDetailSuspense,
  useUpdateReportProvider,
} from '@/lib/service/api-client/reports/reports';
import paths from '@/lib/utils/paths';

interface Props {
  reportProviderId: string;
}

const ReportUpdateForm: FC<Props> = ({reportProviderId}) => {
  const formId = useId();
  const appId = useAppId((store) => store.appId);
  const {showAlert} = useAlert();
  const router = useRouter();
  const queryClient = getQueryClient();

  const {
    data: {data},
  } = useGetReportProviderDetailSuspense(appId, reportProviderId);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      providerType: data.providerType,
      reportProviderType: data.reportProviderType,
      reportKey: data.reportKey,
      commission: data.commission,
    },
  });

  const {mutate} = useUpdateReportProvider({
    mutation: {
      onSuccess: () => {
        showAlert({
          variant: 'success',
          message: '리포트 제공자 수정이 완료되었습니다.',
        });
        queryClient.invalidateQueries({
          queryKey: getGetReportProviderListQueryKey(appId),
        });
        queryClient.invalidateQueries({
          queryKey: getGetReportProviderDetailQueryKey(appId, reportProviderId),
        });
        router.back();
      },
      onError: (error: any) => {
        const message =
          error.detail?.message || '리포트 제공자 수정에 실패하였습니다.';
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
      reportProviderId,
      data,
    });
  };

  return (
    <Stack px={2} pb={4}>
      <FormProvider {...methods}>
        <ReportManagementForm
          id={formId}
          onSubmit={methods.handleSubmit(onSubmit)}
          formType="UPDATE"
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

export default ReportUpdateForm;
