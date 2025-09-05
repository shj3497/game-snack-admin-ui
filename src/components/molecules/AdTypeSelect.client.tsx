'use client';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectProps,
  styled,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import {FC, ReactNode, useEffect, useId, useState} from 'react';

type Props = {
  helperText?: string;
  useDefaultValue?: boolean;
} & SelectProps;

export type AdOrderType =
  | 'adpopcorn_interstitial'
  | 'adpopcorn_video'
  | 'mezzo_interstitial'
  | 'mezzo_video'
  | 'dawin_video'
  | 'gpt_interstitial'
  | 'gpt_reward';

export type AdProviderType = 'ADPOPCORN' | 'MEZZO' | 'DAWIN' | 'GOOGLE';

const StyledMenuItem = styled(MenuItem)`
  border-radius: 0;
`;

export const getAdProviderType = (
  adType: AdOrderType,
): AdProviderType | (string & {}) => {
  if (adType === 'adpopcorn_interstitial' || adType === 'adpopcorn_video') {
    return 'ADPOPCORN';
  } else if (adType === 'mezzo_interstitial' || adType === 'mezzo_video') {
    return 'MEZZO';
  } else if (adType === 'dawin_video') {
    return 'DAWIN';
  } else if (adType === 'gpt_interstitial' || adType === 'gpt_reward') {
    return 'GOOGLE';
  }

  return '';
};

const AdTypeSelect: FC<Props> = ({
  label = '광고 타입',
  size,
  error,
  helperText,
  onChange,
  value,
  useDefaultValue = false,
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
    <FormControl error={error}>
      <InputLabel id={id} size={size}>
        {label}
      </InputLabel>
      <Select
        {...props}
        labelId={id}
        size={size}
        label={label}
        value={state}
        defaultValue=""
        error={error}
        onChange={handleChange}
      >
        {useDefaultValue && <StyledMenuItem value="">전체</StyledMenuItem>}
        <StyledMenuItem value="adpopcorn_interstitial">
          애드팝콘 전면
        </StyledMenuItem>
        <StyledMenuItem value="adpopcorn_video">애드팝콘 비디오</StyledMenuItem>
        <StyledMenuItem value="mezzo_interstitial">메조 전면</StyledMenuItem>
        <StyledMenuItem value="mezzo_video">메조 비디오</StyledMenuItem>
        <StyledMenuItem value="dawin_video">다윈</StyledMenuItem>
        <StyledMenuItem value="gpt_interstitial">구글 전면</StyledMenuItem>
        <StyledMenuItem value="gpt_reward">구글 리워드</StyledMenuItem>
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
export default AdTypeSelect;
