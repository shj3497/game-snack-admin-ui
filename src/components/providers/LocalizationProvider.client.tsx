'use client';

import {FC} from 'react';
import {LocalizationProvider as Provider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

interface Props {
  children: React.ReactNode;
}

const LocalizationProvider: FC<Props> = ({children}) => {
  return <Provider dateAdapter={AdapterDayjs}>{children}</Provider>;
};

export default LocalizationProvider;
