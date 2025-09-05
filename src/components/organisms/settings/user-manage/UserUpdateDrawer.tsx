import DrawerPage from '@/components/layout/DrawerPage.client';
import UserUpdateForm from './UserUpdateForm.client';
import {FC, Suspense} from 'react';
import paths from '@/lib/utils/paths';

interface Props {
  userId: string;
  superspaceConfig?: SuperSpaceConfig;
}

const UserUpdateDrawer: FC<Props> = ({userId, superspaceConfig}) => {
  const isSuperspace = !!superspaceConfig;
  const path = isSuperspace
    ? paths.superspace.settings.app.user.detail(superspaceConfig.appId, userId)
    : paths.workspace.settings.user.detail(userId);

  const backPath = isSuperspace
    ? paths.superspace.settings.app.detail(superspaceConfig.appId)
    : paths.workspace.settings.user.main;

  return (
    <Suspense>
      <DrawerPage title="사용자 업데이트" path={path} backPath={backPath}>
        <UserUpdateForm userId={userId} />
      </DrawerPage>
    </Suspense>
  );
};
export default UserUpdateDrawer;
