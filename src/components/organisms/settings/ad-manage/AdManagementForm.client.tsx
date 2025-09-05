'use client';

import {Stack, Card, Typography, TextField} from '@mui/material';
import AdConfigField from './AdConfigField.client';
import {
  AdOrderType,
  AdProviderType,
  getAdProviderType,
} from '@/components/molecules/AdTypeSelect.client';
import {Controller, useFormContext} from 'react-hook-form';
import AdTypeSelect from '@/components/molecules/AdTypeSelect.client';
import zod from 'zod';
import {FC, HTMLAttributes} from 'react';

interface Props extends HTMLAttributes<HTMLFormElement> {}

const baseSchema = zod.object({
  name: zod.string().min(1, '이름을 입력해주세요.'),
  description: zod.string(),
  adOrderType: zod
    .string()
    .min(1, '광고 타입을 선택해주세요.')
    .transform((val) => (val as AdOrderType) || ''),
});

const adpopcornConfigSchema = zod.object({
  name: zod.string().min(1, '이름을 입력해주세요.'),
  appKey: zod.string().min(1, 'app_key를 입력해주세요.'),
  placementId: zod.string().min(1, 'placement_id를 입력해주세요.'),
});
const mezzoConfigSchema = zod.object({
  name: zod.string().min(1, '이름을 입력해주세요.'),
  publisher: zod.string().min(1, 'publisher를 입력해주세요.'),
  media: zod.string().min(1, 'media를 입력해주세요.'),
  section: zod.string().min(1, 'section을 입력해주세요.'),
});
const dawintConfigSchema = zod.object({
  name: zod.string().min(1, '이름을 입력해주세요.'),
  adSlotId: zod.string().min(1, 'ad_slot_id를 입력해주세요.'),
});
const gptConfigSchema = zod.object({
  name: zod.string().min(1, '이름을 입력해주세요.'),
  adUnitPath: zod.string().min(1, 'ad_unit_path를 입력해주세요.'),
});

const adpopcornSchema = baseSchema.extend({
  adProviderType: zod.literal('ADPOPCORN'),
  android: adpopcornConfigSchema,
  ios: adpopcornConfigSchema,
});
const mezzoSchema = baseSchema.extend({
  adProviderType: zod.literal('MEZZO'),
  android: mezzoConfigSchema,
  ios: mezzoConfigSchema,
});
const dawintSchema = baseSchema.extend({
  adProviderType: zod.literal('DAWIN'),
  android: dawintConfigSchema,
  ios: dawintConfigSchema,
});

const gptSchema = baseSchema.extend({
  adProviderType: zod.literal('GOOGLE'),
  android: gptConfigSchema,
  ios: gptConfigSchema,
});

const emptySchema = baseSchema.extend({
  adProviderType: zod.literal(''),
  android: zod.union([zod.object({}), zod.null()]),
  ios: zod.union([zod.object({}), zod.null()]),
});

export const schema = zod.discriminatedUnion('adProviderType', [
  emptySchema,
  adpopcornSchema,
  mezzoSchema,
  dawintSchema,
  gptSchema,
]);

export type AdManagementFormValues = zod.infer<typeof schema>;

const AdManagementForm: FC<Props> = (props) => {
  const {
    register,
    setValue,
    watch,
    formState: {errors},
    resetField,
  } = useFormContext<AdManagementFormValues>();

  const handleAdOrderTypeChange = (adOrderType: AdOrderType) => {
    const adProviderType = getAdProviderType(adOrderType);
    setValue('adProviderType', adProviderType as AdProviderType);
    resetField('android');
    resetField('ios');
  };

  return (
    <form {...props}>
      <Stack width="100%" spacing={4}>
        <Card sx={{p: 2}}>
          <Typography variant="subtitle2">ad info</Typography>
          <Stack mt={3} spacing={2}>
            <TextField
              {...register('name')}
              label="이름"
              size="small"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              {...register('description')}
              label="설명"
              size="small"
              fullWidth
              multiline
              minRows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Stack>
        </Card>

        <Card sx={{p: 2}}>
          <Typography variant="subtitle2">ad config</Typography>
          <Stack mt={3} spacing={2}>
            <Controller
              name="adOrderType"
              defaultValue=""
              render={({field}) => (
                <AdTypeSelect
                  {...field}
                  size="small"
                  label="광고 지면 타입"
                  fullWidth
                  error={!!errors.adOrderType}
                  helperText={errors.adOrderType?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleAdOrderTypeChange(e.target.value as AdOrderType);
                  }}
                />
              )}
            />

            <Card sx={{p: 2}}>
              <Typography variant="subtitle2" mb={2}>
                Android
              </Typography>
              {!!watch('adOrderType') && (
                <AdConfigField
                  key={watch('adOrderType')}
                  name="android"
                  adOrderType={watch('adOrderType')}
                />
              )}
            </Card>
            <Card sx={{p: 2}}>
              <Typography variant="subtitle2" mb={2}>
                iOS
              </Typography>
              {!!watch('adOrderType') && (
                <AdConfigField
                  key={watch('adOrderType')}
                  name="ios"
                  adOrderType={watch('adOrderType')}
                />
              )}
            </Card>
          </Stack>
        </Card>
      </Stack>
    </form>
  );
};
export default AdManagementForm;
