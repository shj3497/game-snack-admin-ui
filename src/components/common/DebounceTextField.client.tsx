'use client';

import {TextField, TextFieldProps} from '@mui/material';
import {FC, useState, useMemo, useEffect} from 'react';
import {debounce} from 'lodash';

const DebounceTextField: FC<TextFieldProps> = ({
  value = '',
  onChange,
  ...props
}) => {
  const [state, setState] = useState('');

  const debounceChange = useMemo(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
      }, 500),
    [onChange],
  );

  useEffect(() => {
    return () => {
      debounceChange.cancel();
    };
  }, [debounceChange]);

  useEffect(() => {
    setState(value as string);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
    debounceChange(event);
  };

  return <TextField {...props} value={state} onChange={handleChange} />;
};

export default DebounceTextField;
