'use client';

import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import AdManagementForm, {
  AdManagementFormValues,
  schema,
} from './AdManagementForm.client';
import {
  getGetAdPlacementByAppIdListQueryKey,
  useCreateAdPlacementByAdPopcorn,
  useCreateAdPlacementByDawin,
  useCreateAdPlacementByGoogle,
  useCreateAdPlacementByMezzo,
} from '@/lib/service/api-client/advertisement/advertisement';
import {Button, Stack} from '@mui/material';
import {useId} from 'react';
import useAppId from '@/lib/store/useAppId';
import {useRouter} from 'next/navigation';
import paths from '@/lib/utils/paths';
import {getQueryClient} from '@/lib/service/query-client';
import {zodResolver} from '@hookform/resolvers/zod';
import useAlert from '@/lib/utils/useAlert';

const AdCreateForm = () => {
  const formId = useId();
  const appId = useAppId((store) => store.appId);
  const {showAlert} = useAlert();
  const router = useRouter();
  const queryClient = getQueryClient();

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      adOrderType: '',
      adProviderType: '',
      android: {},
      ios: {},
    },
  });

  const handleSuccess = () => {
    showAlert({
      variant: 'success',
      message: '광고 등록이 완료되었습니다.',
    });

    queryClient.invalidateQueries({
      queryKey: getGetAdPlacementByAppIdListQueryKey(appId),
    });
    router.push(paths.workspace.settings.ad.main);
  };

  const handleError = (error: any) => {
    const message = error.detail?.message || '광고 등록에 실패하였습니다.';
    showAlert({
      variant: 'error',
      message: message,
    });
  };

  const {mutate: adPopcornCreate, isPending: isAdPopcornPending} =
    useCreateAdPlacementByAdPopcorn({
      mutation: {
        onSuccess: handleSuccess,
        onError: handleError,
      },
    });
  const {mutate: dawinCreate, isPending: isDawinPending} =
    useCreateAdPlacementByDawin({
      mutation: {
        onSuccess: handleSuccess,
        onError: handleError,
      },
    });
  const {mutate: googleCreate, isPending: isGooglePending} =
    useCreateAdPlacementByGoogle({
      mutation: {
        onSuccess: handleSuccess,
        onError: handleError,
      },
    });
  const {mutate: mezzoCreate, isPending: isMezzoPending} =
    useCreateAdPlacementByMezzo({
      mutation: {
        onSuccess: handleSuccess,
        onError: handleError,
      },
    });

  const isLoading =
    isAdPopcornPending || isDawinPending || isGooglePending || isMezzoPending;

  const onSubmit: SubmitHandler<AdManagementFormValues> = (data) => {
    if (!appId) return;

    if (data.adProviderType === 'ADPOPCORN') {
      adPopcornCreate({
        appId,
        data,
      });
    } else if (data.adProviderType === 'DAWIN') {
      dawinCreate({
        appId,
        data,
      });
    } else if (data.adProviderType === 'GOOGLE') {
      googleCreate({
        appId,
        data,
      });
    } else if (data.adProviderType === 'MEZZO') {
      mezzoCreate({
        appId,
        data,
      });
    }
  };

  return (
    <Stack px={2} pb={4}>
      <FormProvider {...methods}>
        <AdManagementForm
          id={formId}
          onSubmit={methods.handleSubmit(onSubmit)}
        />
        <Stack mt={2}>
          <Button
            variant="contained"
            form={formId}
            type="submit"
            loading={isLoading}
          >
            Submit
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export default AdCreateForm;
