import {FC} from 'react';
import AllUserManageTable from './AllUserManageTable';

interface Props {
  page?: number;
  pageSize?: number;
}

const AllUserManagePage: FC<Props> = ({page, pageSize}) => {
  return (
    <div>
      <AllUserManageTable page={page} pageSize={pageSize} />
    </div>
  );
};
export default AllUserManagePage;
