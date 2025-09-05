'use client';

import {getQueryClient} from '@/lib/service/query-client';
import useAppId from '@/lib/store/useAppId';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'next/navigation';
import {FC, useId} from 'react';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import AdManagementForm, {
  AdManagementFormValues,
  schema,
} from './AdManagementForm.client';
import {Button, Stack} from '@mui/material';
import {
  getGetAdPlacementByAppIdListQueryKey,
  getGetAdPlacementByIdQueryKey,
  useGetAdPlacementByIdSuspense,
  useUpdateAdPlacementByAdPopcorn,
  useUpdateAdPlacementByDawin,
  useUpdateAdPlacementByGoogle,
  useUpdateAdPlacementByMezzo,
} from '@/lib/service/api-client/advertisement/advertisement';
import paths from '@/lib/utils/paths';
import useAlert from '@/lib/utils/useAlert';

interface Props {
  adId: string;
}

const AdUpdateForm: FC<Props> = ({adId}) => {
  const formId = useId();
  const appId = useAppId((store) => store.appId);
  const router = useRouter();
  const queryClient = getQueryClient();
  const {showAlert} = useAlert();

  const {
    data: {data},
  } = useGetAdPlacementByIdSuspense(appId, adId);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data.name || '',
      description: data.description || '',
      adOrderType: data.adOrderType,
      adProviderType: data.providerType,
      android: data.android,
      ios: data.ios,
    },
  });
  const {handleSubmit} = methods;

  const handleSuccess = () => {
    showAlert({
      variant: 'success',
      message: '광고 지면이 업데이트되었습니다.',
    });
    queryClient.invalidateQueries({
      queryKey: getGetAdPlacementByAppIdListQueryKey(appId),
    });
    queryClient.invalidateQueries({
      queryKey: getGetAdPlacementByIdQueryKey(appId, adId),
    });
    router.push(paths.workspace.settings.ad.main);
  };
  const handleError = (error: any) => {
    const message =
      error.detail?.message || '광고 지면 업데이트에 실패하였습니다.';
    showAlert({
      variant: 'error',
      message: message,
    });
  };

  const {mutate: adPopcornUpdate, isPending: isAdPopcornPending} =
    useUpdateAdPlacementByAdPopcorn({
      mutation: {onSuccess: handleSuccess, onError: handleError},
    });
  const {mutate: dawinUpdate, isPending: isDawinPending} =
    useUpdateAdPlacementByDawin({
      mutation: {onSuccess: handleSuccess, onError: handleError},
    });
  const {mutate: googleUpdate, isPending: isGooglePending} =
    useUpdateAdPlacementByGoogle({
      mutation: {onSuccess: handleSuccess, onError: handleError},
    });
  const {mutate: mezzoUpdate, isPending: isMezzoPending} =
    useUpdateAdPlacementByMezzo({
      mutation: {onSuccess: handleSuccess, onError: handleError},
    });

  const isLoading =
    isAdPopcornPending || isDawinPending || isGooglePending || isMezzoPending;

  const onSubmit: SubmitHandler<AdManagementFormValues> = (data) => {
    if (data.adProviderType === 'ADPOPCORN') {
      adPopcornUpdate({appId, id: adId, data});
    } else if (data.adProviderType === 'DAWIN') {
      dawinUpdate({appId, id: adId, data});
    } else if (data.adProviderType === 'GOOGLE') {
      googleUpdate({appId, id: adId, data});
    } else if (data.adProviderType === 'MEZZO') {
      mezzoUpdate({appId, id: adId, data});
    }
  };

  return (
    <Stack px={2} pb={4}>
      <FormProvider {...methods}>
        <AdManagementForm id={formId} onSubmit={handleSubmit(onSubmit)} />
        <Stack mt={2}>
          <Button
            variant="contained"
            form={formId}
            type="submit"
            loading={isLoading}
          >
            SUBMIT
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export default AdUpdateForm;
