import {FC, ReactNode} from 'react';
import {auth} from '@/lib/auth/auth';
import SessionProvider from '@/components/providers/SessionProvider.client';

interface Props {
  children: ReactNode;
}

const layout = async ({children}: Props) => {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};
export default layout;
