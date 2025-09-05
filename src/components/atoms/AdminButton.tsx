'use client';

import {Button, ButtonProps} from '@mui/material';
import {useSession} from 'next-auth/react';

const AdminButton = (props: ButtonProps) => {
  const session = useSession();
  const role = session.data?.user.role;
  const isAdmin = role === 'ADMIN';
  const isSuperAdmin = role === 'SUPER_ADMIN';
  const isUsable = isAdmin || isSuperAdmin;

  if (!isUsable) return null;

  return <Button {...props} />;
};
export default AdminButton;
