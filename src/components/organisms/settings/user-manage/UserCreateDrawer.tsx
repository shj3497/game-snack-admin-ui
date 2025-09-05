import DrawerPage from '@/components/layout/DrawerPage.client';
import UserCreateForm from './UserCreateForm.client';
import paths from '@/lib/utils/paths';
import {FC} from 'react';

interface Props {
  superspaceConfig?: SuperSpaceConfig;
}

const UserCreateDrawer: FC<Props> = ({superspaceConfig}) => {
  const isSuperspace = !!superspaceConfig;
  const path = isSuperspace
    ? paths.superspace.settings.app.user.create(superspaceConfig.appId)
    : paths.workspace.settings.user.create;

  return (
    <DrawerPage title="사용자 생성" path={path}>
      <UserCreateForm />
    </DrawerPage>
  );
};
export default UserCreateDrawer;
