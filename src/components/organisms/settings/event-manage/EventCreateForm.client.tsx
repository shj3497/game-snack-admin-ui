'use client';

import {Button, Stack} from '@mui/material';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import EventManagementForm, {
  EventManagementFormValues,
  schema,
} from './EventManagementForm.client';
import {
  getGetEventListQueryKey,
  useCreateCatchEvent,
  useCreateDrawEvent,
  useCreateFindEvent,
  useCreateRouletteEvent,
} from '@/lib/service/api-client/events/events';
import {useId} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import useAppId from '@/lib/store/useAppId';
import {useRouter} from 'next/navigation';
import {getQueryClient} from '@/lib/service/query-client';
import paths from '@/lib/utils/paths';
import useAlert from '@/lib/utils/useAlert';

interface Props {}

const EventCreateForm = () => {
  const appId = useAppId((store) => store.appId);
  const router = useRouter();
  const queryClient = getQueryClient();
  const {showAlert} = useAlert();

  const formId = useId();
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      eventType: '',
      rewardPrice: 0,
      adminMenuName: '',
      isView: false,
      eventCondition: {},
      introAdPlacementInfo: {
        isNoAdPass: false,
        placementInfo: [],
      },
      resultAdPlacementInfo: {
        isNoAdPass: false,
        placementInfo: [],
      },
      displayName: '',
      summary: '',
      condition: '',
      landingPath: '',
      iconUrl: '',
    },
  });
  const {handleSubmit} = methods;

  const handleSuccess = () => {
    showAlert({
      variant: 'success',
      message: '이벤트 등록이 완료되었습니다.',
    });
    queryClient.invalidateQueries({
      queryKey: getGetEventListQueryKey(appId),
    });
    router.push(paths.workspace.settings.event.main);
    router.refresh();
  };

  const handleError = (error: any) => {
    const message = error.detail?.message || '이벤트 등록에 실패하였습니다.';
    showAlert({
      variant: 'error',
      message: message,
    });
  };

  const {mutate: catchCreate, isPending: isCatchPending} = useCreateCatchEvent({
    mutation: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });

  const {mutate: drawCreate, isPending: isDrawPending} = useCreateDrawEvent({
    mutation: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });

  const {mutate: findCreate, isPending: isFindPending} = useCreateFindEvent({
    mutation: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });

  const {mutate: rouletteCreate, isPending: isRoulettePending} =
    useCreateRouletteEvent({
      mutation: {
        onSuccess: handleSuccess,
        onError: handleError,
      },
    });

  const isLoading =
    isCatchPending || isDrawPending || isFindPending || isRoulettePending;

  const onSubmit: SubmitHandler<EventManagementFormValues> = (data) => {
    console.log(data);
    if (data.eventType === 'CATCH') {
      catchCreate({appId, data});
    } else if (data.eventType === 'DRAW') {
      drawCreate({appId, data});
    } else if (data.eventType === 'FIND') {
      findCreate({appId, data});
    } else if (data.eventType === 'ROULETTE') {
      rouletteCreate({appId, data});
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

export default EventCreateForm;
