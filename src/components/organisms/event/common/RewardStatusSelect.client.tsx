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

const RewardStatusSelect: FC<Props> = ({
  label = '리워드 지급 요청 상태',
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
    <FormControl sx={{width: '200px'}}>
      <InputLabel id={id} size={size}>
        {label}
      </InputLabel>
      <Select
        {...props}
        size={size}
        labelId={id}
        label={label}
        defaultValue=""
        value={state}
        onChange={handleChange}
      >
        {useDefaultValue && <StyledMenuItem value="">전체</StyledMenuItem>}
        <StyledMenuItem value="SUCCESS">SUCCESS</StyledMenuItem>
        <StyledMenuItem value="FAILED">FAILED</StyledMenuItem>
        <StyledMenuItem value="NONE">NONE</StyledMenuItem>
      </Select>
    </FormControl>
  );
};

export default RewardStatusSelect;
