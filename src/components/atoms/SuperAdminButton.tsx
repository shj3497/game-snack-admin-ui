'use client';

import {Button, ButtonProps} from '@mui/material';
import {useSession} from 'next-auth/react';

const SuperAdminButton = ({...props}: ButtonProps) => {
  const session = useSession();
  const role = session.data?.user.role;
  const isSuperAdmin = role === 'SUPER_ADMIN';

  if (!isSuperAdmin) return null;

  return <Button {...props} />;
};
export default SuperAdminButton;
