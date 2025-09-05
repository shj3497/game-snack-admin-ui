import {FC} from 'react';
import AdManageTable from './AdManageTable';

interface Props extends AdManagePageFilter {}

export type AdManagePageFilter = {
  page?: number;
  pageSize?: number;
  name?: string;
  providerType?: string;
  adOrderType?: string;
};

const AdManagePage: FC<Props> = ({...props}) => {
  return (
    <div>
      <AdManageTable {...props} />
    </div>
  );
};

export default AdManagePage;
