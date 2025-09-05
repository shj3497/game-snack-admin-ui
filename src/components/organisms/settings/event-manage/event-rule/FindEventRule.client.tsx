'use client';

import {Stack, TextField} from '@mui/material';
import {FC} from 'react';
import {useFormContext} from 'react-hook-form';

interface Props {
  defaultName?: string;
}

const FindEventRule: FC<Props> = ({defaultName}) => {
  const {
    register,
    formState: {errors},
  } = useFormContext();
  const name = !!defaultName ? defaultName + '.' : '';
  const secondsError = (errors[defaultName || ''] as any)?.['seconds'];
  const cardCountError = (errors[defaultName || ''] as any)?.['cardCount'];
  return (
    <Stack spacing={2}>
      <TextField
        {...register(`${name}seconds`)}
        label="second (s)"
        size="small"
        fullWidth
        error={!!secondsError}
        helperText={secondsError?.message as string}
      />
      <TextField
        {...register(`${name}cardCount`)}
        label="찾을 카드 개수"
        size="small"
        fullWidth
        error={!!cardCountError}
        helperText={cardCountError?.message as string}
      />
    </Stack>
  );
};

export default FindEventRule;
