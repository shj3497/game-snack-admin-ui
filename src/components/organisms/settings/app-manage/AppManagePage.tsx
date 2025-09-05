import {FC} from 'react';
import AppManageTable from './AppManageTable';

interface Props {
  page?: number;
  pageSize?: number;
}

const AppManagePage: FC<Props> = (props) => {
  return (
    <div>
      <AppManageTable {...props} />
    </div>
  );
};

export default AppManagePage;
