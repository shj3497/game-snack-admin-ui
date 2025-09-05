'use client';

import {Button, ButtonProps} from '@mui/material';
import {FC} from 'react';

type UploadButtonProps = {
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  accept?: string;
} & ButtonProps;

const UploadButton: FC<UploadButtonProps> = ({
  onFileChange,
  multiple,
  accept,
  children,
  ...props
}) => {
  return (
    <Button component="label" role={undefined} tabIndex={-1} {...props}>
      {children}
      <input
        type="file"
        accept={accept}
        onChange={onFileChange}
        multiple={multiple}
        style={{
          clip: 'rect(0 0 0 0)',
          clipPath: 'inset(50%)',
          height: 1,
          overflow: 'hidden',
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      />
    </Button>
  );
};

export type {UploadButtonProps};
export default UploadButton;
