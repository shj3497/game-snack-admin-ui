import {auth} from '@/lib/auth/auth';

interface Props {
  children: React.ReactNode;
}

const layout = async ({children}: Props) => {
  //TODO Role 검사
  // Admin 이상만 접근 가능
  const session = await auth();
  const role = session?.user.role;
  const isAccessible = ['SUPER_ADMIN', 'ADMIN'].includes(role || 'MANAGER');
  if (!isAccessible) {
    const error = new Error('access-denied');
    throw error;
  }

  return <>{children}</>;
};

export default layout;
