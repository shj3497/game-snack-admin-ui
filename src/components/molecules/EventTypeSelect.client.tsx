'use client';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  styled,
} from '@mui/material';
import {FC, useId} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

type Props = {helperText?: string; name: string} & SelectProps;

const StyledMenuItem = styled(MenuItem)`
  border-radius: 0;
`;

export type EventType = 'CATCH' | 'DRAW' | 'FIND' | 'ROULETTE';

export const getEventDisplayName = (eventType: EventType | (string & {})) => {
  if (eventType === 'CATCH') {
    return '시간 잡기';
  } else if (eventType === 'DRAW') {
    return '도형 그리기';
  } else if (eventType === 'FIND') {
    return '박스 찾기';
  } else if (eventType === 'ROULETTE') {
    return '룰렛 돌리기';
  }
  return '';
};

const EventTypeSelect: FC<Props> = ({
  label,
  size,
  error,
  helperText,
  name,
  ...props
}) => {
  const id = useId();
  const {control} = useFormContext();
  return (
    <FormControl error={error}>
      <InputLabel size={size} id={id}>
        {label}
      </InputLabel>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({field}) => (
          <Select
            {...field}
            labelId={id}
            label={label}
            size={size}
            onChange={(event, child) => {
              field.onChange(event);
              props.onChange?.(event, child);
            }}
          >
            <StyledMenuItem value="CATCH">시간 잡기</StyledMenuItem>
            <StyledMenuItem value="DRAW">도형 그리기</StyledMenuItem>
            <StyledMenuItem value="FIND">박스 찾기</StyledMenuItem>
            <StyledMenuItem value="ROULETTE">룰렛 돌리기</StyledMenuItem>
            {/* <StyledMenuItem value="rps-roulette">가위바위보</StyledMenuItem>
        <StyledMenuItem value="ladder">사다리타기</StyledMenuItem> */}
          </Select>
        )}
      />

      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
export default EventTypeSelect;
