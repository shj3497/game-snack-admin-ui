import {AccountLayout} from '@/components/organisms/account';
import {Box} from '@mui/material';
import {ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

const layout = ({children}: Props) => {
  return (
    <AccountLayout>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <AccountLayout.Title>Account</AccountLayout.Title>
      </Box>

      <AccountLayout.Paper>{children}</AccountLayout.Paper>
    </AccountLayout>
  );
};

export default layout;
