'use client';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectProps,
  styled,
  SelectChangeEvent,
  FormHelperText,
} from '@mui/material';
import {FC, ReactNode, useEffect, useId, useState} from 'react';

type Props = {
  helperText?: string;
  useDefaultValue?: boolean;
} & SelectProps;

export type AdProviderType = 'ADPOPCORN' | 'MEZZO' | 'DAWIN' | 'GOOGLE';

const StyledMenuItem = styled(MenuItem)`
  border-radius: 0;
`;

const AdProviderSelect: FC<Props> = ({
  label = '업체선택',
  size,
  value,
  onChange,
  useDefaultValue = false,
  error,
  helperText,
  ...props
}) => {
  const id = useId();
  const [state, setState] = useState('');

  const handleChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setState(event.target.value);
    onChange?.(event, child);
  };

  useEffect(() => {
    setState(value as string);
  }, [value]);

  return (
    <FormControl sx={{width: props.fullWidth ? '100%' : '150px'}} error={error}>
      <InputLabel id={id} size={size}>
        {label}
      </InputLabel>
      <Select
        {...props}
        labelId={id}
        size={size}
        label={label}
        defaultValue=""
        value={state}
        error={error}
        onChange={handleChange}
      >
        {useDefaultValue && <StyledMenuItem value="">전체</StyledMenuItem>}
        <StyledMenuItem value="ADPOPCORN">애드팝콘</StyledMenuItem>
        <StyledMenuItem value="MEZZO">메조</StyledMenuItem>
        <StyledMenuItem value="DAWIN">다윈</StyledMenuItem>
        <StyledMenuItem value="GOOGLE">구글</StyledMenuItem>
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
export default AdProviderSelect;
