'use client';

import {Box, Drawer, IconButton, Toolbar, Typography} from '@mui/material';
import {usePathname, useRouter} from 'next/navigation';
import {FC, ReactNode, useEffect, useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  title?: string;
  path: string;
  backPath?: string; // 닫기시 이동할 페이지
  useBackdropClose?: boolean;
  width?: string | number;
  children: ReactNode;
}

const DrawerPage: FC<Props> = ({
  title,
  path,
  backPath,
  useBackdropClose = false,
  width = '600px',
  children,
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleClose = () => {
    if (backPath) {
      router.push(backPath, {scroll: false});
    } else {
      router.back();
    }
  };
  useEffect(() => {
    setOpen(pathname === path);
  }, [pathname, path]);

  return (
    <Drawer
      open={open}
      onClose={(_, reason) => {
        if (reason === 'escapeKeyDown') {
          return;
        }
        if (reason === 'backdropClick') {
          if (!useBackdropClose) return;
        }
        handleClose();
      }}
      anchor="right"
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#fafafa',
          },
        },
      }}
    >
      <Box width={width}>
        <Toolbar sx={{p: 0}}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="h6">{title}</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Toolbar>
        {children}
      </Box>
    </Drawer>
  );
};

export default DrawerPage;
