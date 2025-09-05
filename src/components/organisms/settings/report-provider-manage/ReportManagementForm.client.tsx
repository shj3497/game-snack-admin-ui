'use client';

import ReportProviderSelect, {
  getReportProviderType,
  ReportProviderType,
} from '@/components/molecules/ReportProviderSelect.client';
import {Card, Stack, TextField, Typography} from '@mui/material';
import {FC, HTMLAttributes} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import zod from 'zod';

interface Props extends HTMLAttributes<HTMLFormElement> {
  formType: 'CREATE' | 'UPDATE';
}

export const schema = zod.object({
  providerType: zod.string().min(1, '리포트 매체를 선택해주세요.'),
  reportProviderType: zod.string().min(1, '리포트 매체를 선택해주세요.'),
  reportKey: zod.string().min(1, '리포트 키를 입력해주세요.'),
  commission: zod
    .union([zod.string(), zod.number()])
    .refine(
      (value) => {
        const num = Number(value);
        return !isNaN(num) && isFinite(num);
      },
      {message: '유효한 숫자를 입력해주세요.'},
    )
    .transform((value) => Number(value))
    .refine((num) => num >= 0 && num <= 1, {
      message: '0.0 ~ 1.0 사이의 숫자를 입력해주세요.',
    }),
});

export type ReportManagementFormValues = zod.infer<typeof schema>;

const ReportManagementForm: FC<Props> = ({formType, ...props}) => {
  const {
    control,
    register,
    setValue,
    formState: {errors},
  } = useFormContext<ReportManagementFormValues>();

  const handleReportProviderTypeChange = (
    reportProviderType: ReportProviderType,
  ) => {
    const providerType = getReportProviderType(reportProviderType);
    setValue('providerType', providerType);
  };

  return (
    <form {...props}>
      <Stack width="100%" spacing={4}>
        <Card sx={{p: 2}}>
          <Typography variant="subtitle2">report config</Typography>
          <Stack mt={3} spacing={2}>
            <Controller
              name="reportProviderType"
              control={control}
              defaultValue=""
              disabled={formType === 'UPDATE'}
              render={({field}) => (
                <ReportProviderSelect
                  {...field}
                  size="small"
                  label="report provider type"
                  fullWidth
                  error={!!errors.reportProviderType}
                  helperText={errors.reportProviderType?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleReportProviderTypeChange(
                      e.target.value as ReportProviderType,
                    );
                  }}
                  disabled={formType === 'UPDATE'}
                />
              )}
            />

            <TextField
              {...register('reportKey')}
              label="report key"
              size="small"
              fullWidth
              error={!!errors.reportKey}
              helperText={errors.reportKey?.message}
            />
            <TextField
              {...register('commission')}
              label="commission"
              placeholder="0.0 ~ 1.0"
              size="small"
              fullWidth
              error={!!errors.commission}
              helperText={errors.commission?.message}
            />
          </Stack>
        </Card>
      </Stack>
    </form>
  );
};

export default ReportManagementForm;
