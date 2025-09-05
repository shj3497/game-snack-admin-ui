import {FC} from 'react';
import UserManageTable from './UserManageTable';

interface Props {
  page?: number;
  pageSize?: number;
}

const UserManagePage: FC<Props> = ({page, pageSize}) => {
  return (
    <div>
      <UserManageTable page={page} pageSize={pageSize} />
    </div>
  );
};
export default UserManagePage;
