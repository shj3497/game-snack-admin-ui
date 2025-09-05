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

export type ReportProviderType =
  | 'ADPOPCORN'
  | 'MEZZO'
  | 'MEZZO_VIDEO'
  | 'DAWIN'
  | 'GOOGLE';

const StyledMenuItem = styled(MenuItem)`
  border-radius: 0;
`;

export const getReportProviderType = (providerType: ReportProviderType) => {
  if (providerType === 'ADPOPCORN') {
    return 'ADPOPCORN';
  } else if (providerType === 'MEZZO' || providerType === 'MEZZO_VIDEO') {
    return 'MEZZO';
  } else if (providerType === 'DAWIN') {
    return 'DAWIN';
  } else if (providerType === 'GOOGLE') {
    return 'GOOGLE';
  }

  return '';
};

const ReportProviderSelect: FC<Props> = ({
  label = '리포트 매체 선택',
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
        <StyledMenuItem value="MEZZO_VIDEO">메조 비디오</StyledMenuItem>
        <StyledMenuItem value="DAWIN">다윈</StyledMenuItem>
        <StyledMenuItem value="GOOGLE">구글</StyledMenuItem>
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
export default ReportProviderSelect;
