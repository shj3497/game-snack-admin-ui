'use client';

import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import {Controller, useFormContext} from 'react-hook-form';
import EventAdSelector from './EventAdSelector.client';
import UploadButton from '@/components/atoms/UploadButton.client';
import {FC, HTMLAttributes, useRef} from 'react';
import zod from 'zod';
import EventTypeSelect from '@/components/molecules/EventTypeSelect.client';
import EventRule from './event-rule';
import {DrawShapeType} from './event-rule/DrawEventRule.client';
import {useUploadImage} from '@/lib/service/api-client/events/events';

interface Props extends HTMLAttributes<HTMLFormElement> {}

const adPlacementInfoSchema = zod.object({
  isNoAdPass: zod.boolean().default(false),
  placementInfo: zod
    .array(
      zod.object({
        placementId: zod.string(),
        sort: zod.number(),
      }),
    )
    .default([]),
});

const baseSchema = zod.object({
  //* event info
  // eventType: zod.string().min(1, '이벤트 타입을 선택해주세요.'), >> exends를 통해 넣어줬음
  rewardPrice: zod
    .union([zod.string(), zod.number()])
    .refine(
      (value) => {
        const num = Number(value);
        // 숫자로 변환 가능하고, 유한한 숫자인지 확인 (NaN, Infinity 방지)
        return !isNaN(num) && isFinite(num);
      },
      {message: '유효한 숫자를 입력해주세요.'},
    )
    .transform((value) => Number(value)), // 최종 타입을 숫자로 변환,
  isView: zod.boolean().default(false),
  adminMenuName: zod.string().min(1, '이벤트 이름을 입력해주세요.'),

  //* event rule
  // eventCondition:zod.object({}) >> exends를 통해 넣어줬음
  //* 광고 연결
  introAdPlacementInfo: adPlacementInfoSchema,
  resultAdPlacementInfo: adPlacementInfoSchema,
  //* cmp info
  displayName: zod.string().min(1, '이름을 입력해주세요.'),
  summary: zod.string().min(1, '설명을 입력해주세요.'), // 설명
  condition: zod.string().min(1, '간략한 설명을 입력해주세요.'), // 간략한 설명
  landingPath: zod.string().min(1, 'landing url을 입력해주세요.'), // 랜딩 URL Path
  iconUrl: zod.string().optional(), // 아이콘 URL
  feedUrl: zod.string().optional(), // 피드 URL
});

const emptyEventSchema = baseSchema.extend({
  eventType: zod.literal(''),
  eventCondition: zod
    .union([zod.object({}), zod.null(), zod.undefined()])
    .optional(),
});

const catchEventSchema = baseSchema.extend({
  eventType: zod.literal('CATCH'),
  eventCondition: zod.object({
    seconds: zod
      .union([zod.string(), zod.number()])
      .refine(
        (value) => {
          const num = Number(value);
          // 숫자로 변환 가능하고, 유한한 숫자인지 확인 (NaN, Infinity 방지)
          return !isNaN(num) && isFinite(num);
        },
        {message: '유효한 숫자를 입력해주세요.'},
      )
      .transform((value) => Number(value)), // 최종 타입을 숫자로 변환,
  }),
});

const drawEventSchema = baseSchema.extend({
  eventType: zod.literal('DRAW'),
  eventCondition: zod.object({
    seconds: zod
      .union([zod.string(), zod.number()])
      .refine(
        (value) => {
          const num = Number(value);
          // 숫자로 변환 가능하고, 유한한 숫자인지 확인 (NaN, Infinity 방지)
          return !isNaN(num) && isFinite(num);
        },
        {message: '유효한 숫자를 입력해주세요.'},
      )
      .transform((value) => Number(value)), // 최종 타입을 숫자로 변환,
    shape: zod.string().transform((value) => value as DrawShapeType),
  }),
});

const findEventSchema = baseSchema.extend({
  eventType: zod.literal('FIND'),
  eventCondition: zod.object({
    seconds: zod
      .union([zod.string(), zod.number()])
      .refine(
        (value) => {
          const num = Number(value);
          // 숫자로 변환 가능하고, 유한한 숫자인지 확인 (NaN, Infinity 방지)
          return !isNaN(num) && isFinite(num);
        },
        {message: '유효한 숫자를 입력해주세요.'},
      )
      .transform((value) => Number(value)), // 최종 타입을 숫자로 변환,
    cardCount: zod
      .union([zod.string(), zod.number()])
      .refine(
        (value) => {
          const num = Number(value);
          // 숫자로 변환 가능하고, 유한한 숫자인지 확인 (NaN, Infinity 방지)
          return !isNaN(num) && isFinite(num);
        },
        {message: '유효한 숫자를 입력해주세요.'},
      )
      .transform((value) => {
        return Number(value);
      }),
  }),
});

const rouletteEventSchema = baseSchema.extend({
  eventType: zod.literal('ROULETTE'),
  eventCondition: zod.object({
    rate: zod
      .union([zod.string(), zod.number()])
      .refine(
        (value) => {
          const num = Number(value);
          return !isNaN(num) && isFinite(num);
        },
        {message: '유효한 숫자를 입력해주세요.'},
      )
      .transform((value) => Number(value))
      .refine((num) => num >= 0 && num <= 100, {
        message: '0과 100 사이의 숫자를 입력해주세요.',
      }),
  }),
});

export const schema = zod.discriminatedUnion('eventType', [
  emptyEventSchema,
  catchEventSchema,
  drawEventSchema,
  findEventSchema,
  rouletteEventSchema,
]);

export type EventManagementFormValues = zod.infer<typeof schema>;

const EventManagementForm: FC<Props> = (props) => {
  const uploadBtnRef = useRef<HTMLButtonElement>(null);
  const feedUploadBtnRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    setValue,
    getValues,
    control,
    watch,
    formState: {errors},
  } = useFormContext<EventManagementFormValues>();

  const {mutate: mutateIcon, isPending: isIconPending} = useUploadImage({
    mutation: {
      onSuccess: (data) => {
        const {url} = data;
        setValue('iconUrl', url);
      },
      onError: (error: any) => {
        console.log('icon upload error', error);
      },
    },
  });

  const {mutate: mutateFeed, isPending: isFeedPending} = useUploadImage({
    mutation: {
      onSuccess: (data) => {
        const {url} = data;
        setValue('feedUrl', url);
      },
      onError: (error: any) => {
        console.log('feed upload error', error);
      },
    },
  });

  const handleEventTypeChange = (event: any, child: any) => {
    const eventType = event.target.value;
    if (eventType === 'CATCH') {
      setValue('landingPath', '/event/catch-second');
    } else if (eventType === 'DRAW') {
      setValue('landingPath', '/event/draw-second');
    } else if (eventType === 'FIND') {
      setValue('landingPath', '/event/find-second');
    } else if (eventType === 'ROULETTE') {
      setValue('landingPath', '/event/roulette');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length === 0) return;
    const file = files[0];
    mutateIcon({data: {file}});
  };

  const handleFeedFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length === 0) return;
    const file = files[0];
    mutateFeed({data: {file}});
  };
  return (
    <form {...props}>
      <Stack width="100%" spacing={4}>
        <Card sx={{p: 2}}>
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            <Typography>이벤트 공개</Typography>

            <Controller
              control={control}
              name="isView"
              render={({field}) => (
                <Switch
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          </Stack>
        </Card>
        <Stack>
          <Card sx={{p: 2}}>
            <Typography variant="subtitle2">event info</Typography>
            <Stack mt={3} spacing={2}>
              <TextField
                {...register('adminMenuName')}
                label="이벤트 이름"
                size="small"
                fullWidth
                error={!!errors.adminMenuName}
                helperText={errors.adminMenuName?.message}
              />
              <EventTypeSelect
                name="eventType"
                label="이벤트 타입"
                size="small"
                fullWidth
                defaultValue=""
                error={!!errors.eventType}
                helperText={errors.eventType?.message}
                onChange={handleEventTypeChange}
              />
              <TextField
                {...register('rewardPrice')}
                type="number"
                label="보상 포인트"
                size="small"
                fullWidth
                error={!!errors.rewardPrice}
                helperText={errors.rewardPrice?.message}
              />
            </Stack>
          </Card>
        </Stack>

        <Card sx={{p: 2}}>
          <Typography variant="subtitle2">event rule</Typography>
          <Stack mt={3}>
            <EventRule
              key={watch('eventType')}
              name="eventCondition"
              eventType={watch('eventType')}
            />
          </Stack>
        </Card>

        <Card sx={{p: 2}}>
          <Typography variant="subtitle2">광고 연결</Typography>
          <Stack mt={2} spacing={2}>
            <Card sx={{p: 2}}>
              <Typography variant="subtitle2" mb={2}>
                intro 광고
              </Typography>
              <EventAdSelector
                value={getValues('introAdPlacementInfo.placementInfo')}
                onChange={(value) => {
                  setValue('introAdPlacementInfo.placementInfo', value);
                }}
              />

              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Controller
                  control={control}
                  name="introAdPlacementInfo.isNoAdPass"
                  render={({field}) => (
                    <FormControlLabel
                      label="모든 광고 noAd시 pass"
                      labelPlacement="start"
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          size="small"
                          sx={{padding: '4px'}}
                        />
                      }
                      sx={{fontSize: '12px'}}
                    />
                  )}
                />
              </Box>
            </Card>
            <Card sx={{p: 2}}>
              <Typography variant="subtitle2" mb={2}>
                result 광고
              </Typography>
              <EventAdSelector
                value={getValues('resultAdPlacementInfo.placementInfo')}
                onChange={(value) => {
                  setValue('resultAdPlacementInfo.placementInfo', value);
                }}
              />

              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Controller
                  control={control}
                  name="resultAdPlacementInfo.isNoAdPass"
                  render={({field}) => (
                    <FormControlLabel
                      label="모든 광고 noAd시 pass"
                      labelPlacement="start"
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          size="small"
                          sx={{padding: '4px'}}
                        />
                      }
                      sx={{fontSize: '12px'}}
                    />
                  )}
                />
              </Box>
            </Card>
          </Stack>
        </Card>

        <Card sx={{p: 2}}>
          <Typography variant="subtitle2">cmp info</Typography>
          <Stack mt={3} spacing={2}>
            <TextField
              {...register('displayName')}
              label="이름"
              size="small"
              fullWidth
              error={!!errors.displayName}
              helperText={errors.displayName?.message}
            />
            <TextField
              {...register('summary')}
              label="설명"
              size="small"
              fullWidth
              error={!!errors.summary}
              helperText={errors.summary?.message}
            />
            <TextField
              {...register('condition')}
              label="간략한 설명"
              size="small"
              fullWidth
              error={!!errors.condition}
              helperText={errors.condition?.message}
            />
            <TextField
              {...register('landingPath')}
              label="landing url"
              size="small"
              fullWidth
              error={!!errors.landingPath}
              helperText={errors.landingPath?.message}
              slotProps={{
                inputLabel: {
                  shrink: !!watch('landingPath'),
                },
              }}
            />

            <Box display="flex" gap={1}>
              {/* iconUrl 업로드 */}
              <Controller
                control={control}
                name="iconUrl"
                defaultValue=""
                render={({field, fieldState}) => (
                  <TextField
                    {...field}
                    label="icon"
                    size="small"
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    onClick={() => {
                      // uploadBtnRef.current?.click();
                    }}
                  />
                )}
              />

              <UploadButton
                ref={uploadBtnRef}
                size="small"
                variant="outlined"
                color="inherit"
                accept="image/*"
                onFileChange={handleFileChange}
                loading={isIconPending}
              >
                Upload
              </UploadButton>
            </Box>
            <Box display="flex" gap={1}>
              {/* feedUrl 업로드 */}
              <Controller
                control={control}
                name="feedUrl"
                defaultValue=""
                render={({field, fieldState}) => (
                  <TextField
                    {...field}
                    label="feed"
                    size="small"
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    onClick={() => {
                      // feedUploadBtnRef.current?.click();
                    }}
                  />
                )}
              />

              <UploadButton
                ref={feedUploadBtnRef}
                size="small"
                variant="outlined"
                color="inherit"
                accept="image/*"
                onFileChange={handleFeedFileChange}
                loading={isFeedPending}
              >
                Upload
              </UploadButton>
            </Box>
          </Stack>
        </Card>
      </Stack>
    </form>
  );
};
export default EventManagementForm;
