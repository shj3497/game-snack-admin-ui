'use client';

import {
  Box,
  Button,
  Divider,
  Drawer,
  MenuItem,
  MenuList,
  Stack,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {FC, Fragment, useState} from 'react';
import {signOut, useSession} from 'next-auth/react';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AppSettingsAltOutlinedIcon from '@mui/icons-material/AppSettingsAltOutlined';
import Link from 'next/link';
import paths from '@/lib/utils/paths';
import RoleChip from '@/components/atoms/RoleChip';
import {deleteCookie} from 'cookies-next';
import {useAdminAuthGetMyInfo} from '@/lib/service/api-client/admin-auth/admin-auth';
import useAppId from '@/lib/store/useAppId';

interface Props {
  isSuperAdmin?: boolean;
}

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AvatarButton: FC<Props> = ({isSuperAdmin = false}) => {
  const session = useSession();

  const [open, setOpen] = useState<boolean>(false);
  const storedAppId = useAppId((store) => store.appId);
  const appId = isSuperAdmin ? 'super' : storedAppId;
  const {data} = useAdminAuthGetMyInfo(appId, {
    query: {
      staleTime: 30 * 60 * 1000, //30분
      gcTime: 30 * 60 * 1000, //30분
    },
  });

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSignOut = () => {
    signOut({callbackUrl: '/auth/signin'});
    deleteCookie('appId');
  };

  return (
    <Fragment>
      <IconButton onClick={handleClick}>
        <Avatar />
      </IconButton>
      <Drawer open={open} onClose={handleClose} anchor="right">
        <Box width="300px" minHeight="100vh" position="relative">
          <Toolbar
            variant="dense"
            sx={{'&.MuiToolbar-root': {padding: '8px 16px'}}}
          >
            <IconButton size="small" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Stack alignItems="center" justifyContent="space-between">
            <Stack alignItems="center">
              <Avatar sx={{width: '64px', height: '64px', mb: 3}} />
              <Typography>{data?.data?.fullName}</Typography>
              <Typography>{data?.data?.email}</Typography>
              <RoleChip role={session.data?.user.role || ''} sx={{mt: 2}} />
            </Stack>

            <Divider sx={{width: '100%', my: 2}} />

            <Stack px={2} width="100%">
              <MenuList
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Link
                  href={paths.workspace.account.main}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <StyledMenuItem>
                    <ManageAccountsOutlinedIcon />
                    My Account
                  </StyledMenuItem>
                </Link>

                {isSuperAdmin && (
                  <Link href={paths.superspace.main}>
                    <StyledMenuItem>
                      <AppSettingsAltOutlinedIcon />
                      App Setting
                    </StyledMenuItem>
                  </Link>
                )}
              </MenuList>
            </Stack>
          </Stack>

          <Box px={2} width="100%" position="absolute" bottom={16} left={0}>
            <Button
              fullWidth
              color="error"
              onClick={handleSignOut}
              sx={{
                backgroundColor: 'error.100',
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default AvatarButton;
