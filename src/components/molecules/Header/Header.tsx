import {FC} from 'react';
import AvatarButton from './AvatarButton.client';
import {AppBar, AppBarProps, Box, Toolbar} from '@mui/material';
import CompanySelect from './CompanySelect';
import {auth} from '@/lib/auth/auth';

interface Props extends AppBarProps {}

const Header: FC<Props> = async ({sx, ...props}) => {
  const session = await auth();
  const isSuperAdmin = session?.user.role === 'SUPER_ADMIN';
  return (
    <AppBar
      {...props}
      sx={{
        backgroundColor: '#fff',
        ...sx,
      }}
      elevation={0}
      component="header"
    >
      <Toolbar variant="dense" sx={{padding: '8px 24px'}}>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap="12px"
          width="100%"
        >
          <CompanySelect />
          <AvatarButton isSuperAdmin={isSuperAdmin} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
