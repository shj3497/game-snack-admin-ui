'use client';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Button, ButtonProps} from '@mui/material';
import {useRouter} from 'next/navigation';
import {FC} from 'react';

const BackButton: FC<ButtonProps> = ({sx, ...props}) => {
  const router = useRouter();
  return (
    <Button
      startIcon={<KeyboardBackspaceIcon />}
      onClick={() => router.back()}
      {...props}
    ></Button>
  );
};

export default BackButton;
