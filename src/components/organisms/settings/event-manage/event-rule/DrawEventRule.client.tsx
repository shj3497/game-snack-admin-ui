'use client';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
} from '@mui/material';
import {FC, useId} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

interface Props {
  defaultName?: string;
}

const StyledMenuItem = styled(MenuItem)`
  border-radius: 0;
`;

export type DrawShapeType =
  | 'CIRCLE'
  | 'SQUARE'
  | 'TRIANGLE'
  | 'RHOMBUS'
  | 'PENTAGON';

export const getDrawShapeDisplayName = (
  shape: DrawShapeType | (string & {}),
): string => {
  switch (shape) {
    case 'CIRCLE':
      return '원';
    case 'SQUARE':
      return '사각형';
    case 'TRIANGLE':
      return '삼각형';
    case 'RHOMBUS':
      return '마름모';
    case 'PENTAGON':
      return '오각형';
    default:
      return '';
  }
};

const shapeOptions: DrawShapeType[] = [
  'CIRCLE',
  'SQUARE',
  'TRIANGLE',
  'RHOMBUS',
  'PENTAGON',
];

const DrawEventRule: FC<Props> = ({defaultName}) => {
  const id = useId();
  const {
    register,
    formState: {errors},
    control,
  } = useFormContext();
  const name = !!defaultName ? defaultName + '.' : '';
  const secondsError = (errors[defaultName || ''] as any)?.['seconds'];
  const shapeError = (errors[defaultName || ''] as any)?.['shape'];
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
      <FormControl>
        <InputLabel size="small" id={id}>
          도형
        </InputLabel>
        <Controller
          control={control}
          name={`${name}shape`}
          defaultValue=""
          render={({field}) => (
            <Select
              {...field}
              labelId={id}
              label="도형"
              size="small"
              fullWidth
              defaultValue=""
              error={!!shapeError}
            >
              {shapeOptions.map((shape) => (
                <StyledMenuItem key={shape} value={shape}>
                  {getDrawShapeDisplayName(shape)}
                </StyledMenuItem>
              ))}
            </Select>
          )}
        />
        {shapeError && (
          <FormHelperText>{shapeError?.message as string}</FormHelperText>
        )}
      </FormControl>
    </Stack>
  );
};
export default DrawEventRule;
