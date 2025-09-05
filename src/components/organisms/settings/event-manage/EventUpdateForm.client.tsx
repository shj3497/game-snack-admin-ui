'use client';

import {getQueryClient} from '@/lib/service/query-client';
import useAppId from '@/lib/store/useAppId';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'next/navigation';
import {FC, useId} from 'react';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import EventManagementForm, {
  EventManagementFormValues,
  schema,
} from './EventManagementForm.client';
import {
  getGetEventDetailQueryKey,
  getGetEventListQueryKey,
  useGetEventDetailSuspense,
  useUpdateCatchEvent,
  useUpdateDrawEvent,
  useUpdateFindEvent,
  useUpdateRouletteEvent,
} from '@/lib/service/api-client/events/events';
import {Button, Stack} from '@mui/material';
import {EventType} from '@/components/molecules/EventTypeSelect.client';
import paths from '@/lib/utils/paths';
import useAlert from '@/lib/utils/useAlert';

interface Props {
  eventId: string;
}

const EventUpdateForm: FC<Props> = ({eventId}) => {
  const appId = useAppId((store) => store.appId);
  const router = useRouter();
  const queryClient = getQueryClient();
  const formId = useId();
  const {showAlert} = useAlert();

  const {
    data: {data},
  } = useGetEventDetailSuspense(appId, eventId);

  const introAdPlacementInfo = {
    isNoAdPass: data.introAdPlacementInfo?.isNoAdPass || false,
    placementInfo: data.introAdPlacementInfo?.placementInfo
      .map((info) => ({
        placementId: info.id,
        sort: info.sort,
      }))
      .sort((a, b) => a.sort - b.sort),
  };
  const resultAdPlacementInfo = {
    isNoAdPass: data.resultAdPlacementInfo?.isNoAdPass || false,
    placementInfo: data.resultAdPlacementInfo?.placementInfo
      .map((info) => ({
        placementId: info.id,
        sort: info.sort,
      }))
      .sort((a, b) => a.sort - b.sort),
  };

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      eventType: data.eventType as EventType,
      rewardPrice: data.rewardPrice || 0,
      adminMenuName: data.adminMenuName || '',
      isView: data.isView,
      eventCondition: (data.eventCondition as any) || {},
      introAdPlacementInfo,
      resultAdPlacementInfo,
      displayName: data.displayName || '',
      summary: data.summary || '',
      condition: data.condition || '',
      landingPath: data.landingPath || '',
      iconUrl: data.iconUrl || '',
      feedUrl: data.feedUrl || '',
    },
  });
  const {handleSubmit} = methods;

  const handleSuccess = () => {
    showAlert({
      variant: 'success',
      message: '이벤트가 업데이트되었습니다.',
    });
    queryClient.invalidateQueries({
      queryKey: getGetEventListQueryKey(appId),
    });
    queryClient.invalidateQueries({
      queryKey: getGetEventDetailQueryKey(appId, eventId),
    });
    router.push(paths.workspace.settings.event.main);
    router.refresh();
  };
  const handleError = (error: any) => {
    const message =
      error.detail?.message || '이벤트 업데이트에 실패하였습니다.';
    showAlert({
      variant: 'error',
      message,
    });
  };

  const {mutate: catchUpdate, isPending: isCatchPending} = useUpdateCatchEvent({
    mutation: {onSuccess: handleSuccess, onError: handleError},
  });
  const {mutate: drawUpdate, isPending: isDrawPending} = useUpdateDrawEvent({
    mutation: {onSuccess: handleSuccess, onError: handleError},
  });
  const {mutate: findUpdate, isPending: isFindPending} = useUpdateFindEvent({
    mutation: {onSuccess: handleSuccess, onError: handleError},
  });
  const {mutate: rouletteUpdate, isPending: isRoulettePending} =
    useUpdateRouletteEvent({
      mutation: {onSuccess: handleSuccess, onError: handleError},
    });

  const isLoading =
    isCatchPending || isDrawPending || isFindPending || isRoulettePending;

  const onSubmit: SubmitHandler<EventManagementFormValues> = (data) => {
    if (data.eventType === 'CATCH') {
      catchUpdate({appId, eventId, data});
    } else if (data.eventType === 'DRAW') {
      drawUpdate({appId, eventId, data});
    } else if (data.eventType === 'FIND') {
      findUpdate({appId, eventId, data});
    } else if (data.eventType === 'ROULETTE') {
      rouletteUpdate({appId, eventId, data});
    }
  };

  return (
    <Stack px={2} pb={4}>
      <FormProvider {...methods}>
        <EventManagementForm id={formId} onSubmit={handleSubmit(onSubmit)} />
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

export default EventUpdateForm;
