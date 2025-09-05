'use client';

import {SnackbarProvider as NotiStackProvider} from 'notistack';
import {FC} from 'react';

interface Props {
  children?: React.ReactNode;
}

const SnackbarProvider: FC<Props> = ({children}) => {
  return <NotiStackProvider maxSnack={3}>{children}</NotiStackProvider>;
};

export default SnackbarProvider;
