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

const GameResultSelect: FC<Props> = ({
  label = '성공 여부',
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
        <StyledMenuItem value="true">성공</StyledMenuItem>
        <StyledMenuItem value="false">실패</StyledMenuItem>
      </Select>
    </FormControl>
  );
};

export default GameResultSelect;
