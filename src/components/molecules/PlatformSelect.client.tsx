'use client';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  styled,
} from '@mui/material';
import {FC, ReactNode, useEffect, useId, useState} from 'react';

type Props = {
  useDefaultValue?: boolean;
} & SelectProps;

const StyledMenuItem = styled(MenuItem)`
  border-radius: 0;
`;

const PlatformSelect: FC<Props> = ({
  label = '플랫폼',
  useDefaultValue = false,
  size,
  value,
  onChange,
  ...props
}) => {
  const id = useId();
  const [state, setState] = useState('');
  const handleChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setState(event.target.value);
    onChange?.(event, child);
  };

  useEffect(() => {
    if (!value) return;
    setState(value as string);
  }, [value]);

  return (
    <FormControl sx={{width: '150px'}}>
      <InputLabel id={id} size={size}>
        {label}
      </InputLabel>
      <Select
        {...props}
        labelId={id}
        label={label}
        size={size}
        defaultValue=""
        value={state}
        onChange={handleChange}
      >
        {useDefaultValue && <StyledMenuItem value="">전체</StyledMenuItem>}
        <StyledMenuItem value="IOS">IOS</StyledMenuItem>
        <StyledMenuItem value="ANDROID">ANDROID</StyledMenuItem>
        <StyledMenuItem value="ETC">ETC</StyledMenuItem>
      </Select>
    </FormControl>
  );
};

export default PlatformSelect;
