'use client';

import {FormControl, FormHelperText, Stack, TextField} from '@mui/material';
import {FC} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

interface Props {
  defaultName?: string;
}

const RouletteEventRule: FC<Props> = ({defaultName}) => {
  const {
    register,
    control,
    formState: {errors},
  } = useFormContext();
  const name = !!defaultName ? defaultName + '.' : '';
  const rateError = (errors[defaultName || ''] as any)?.['rate'];

  return (
    <Stack>
      <TextField
        {...register(`${name}rate`)}
        type="number"
        label="성공 확률 0 ~ 100(%)"
        size="small"
        fullWidth
        error={!!rateError}
        helperText={rateError?.message as string}
      />
    </Stack>
  );
};
export default RouletteEventRule;
