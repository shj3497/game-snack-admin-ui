'use client';

import {Stack, TextField} from '@mui/material';
import {FC} from 'react';
import {useFormContext} from 'react-hook-form';

interface Props {
  defaultName?: string;
}

const CatchEventRule: FC<Props> = ({defaultName}) => {
  const {
    register,
    formState: {errors},
  } = useFormContext();
  const name = !!defaultName ? defaultName + '.' : '';
  const secondsError = (errors[defaultName || ''] as any)?.['seconds'];
  return (
    <Stack>
      <TextField
        {...register(`${name}seconds`)}
        label="second (s)"
        size="small"
        fullWidth
        error={!!secondsError}
        helperText={secondsError?.message as string}
      />
    </Stack>
  );
};
export default CatchEventRule;
