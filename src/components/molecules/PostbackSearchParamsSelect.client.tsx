'use client';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectProps,
  FormHelperText,
  SelectChangeEvent,
  styled,
} from '@mui/material';
import {FC, useEffect, useId, useState} from 'react';
import {ReactNode} from 'react';

type Props = {
  helperText?: string;
} & SelectProps;

const StyledMenuItem = styled(MenuItem)`
  border-radius: 0;
`;

const PostbackSearchParamsSelect: FC<Props> = ({
  helperText,
  label,
  size,
  value,
  onChange,
  error,
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
    <FormControl fullWidth={props.fullWidth} error={error}>
      <InputLabel size={size}>{label}</InputLabel>
      <Select
        {...props}
        labelId={id}
        fullWidth
        label={label}
        size={size}
        defaultValue=""
        value={state}
        onChange={handleChange}
      >
        <StyledMenuItem value="clickKey">clickKey</StyledMenuItem>
        <StyledMenuItem value="adid">adid</StyledMenuItem>
        <StyledMenuItem value="idfa">idfa</StyledMenuItem>
        <StyledMenuItem value="platform">platform</StyledMenuItem>
        <StyledMenuItem value="userId">userId</StyledMenuItem>
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default PostbackSearchParamsSelect;
