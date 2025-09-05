import {FC} from 'react';
import ReportTable from './ReportTable';

export interface ReportPageFilter {
  page?: number;
  pageSize?: number;
  fromDate?: string;
  toDate?: string;
  providerType?: string;
  placementName?: string;
}

interface Props extends ReportPageFilter {}

const ReportPage: FC<Props> = ({
  page = 0,
  pageSize = 10,
  fromDate,
  toDate,
  providerType,
  placementName,
}) => {
  return (
    <div>
      <ReportTable
        page={page}
        pageSize={pageSize}
        fromDate={fromDate}
        toDate={toDate}
        providerType={providerType}
        placementName={placementName}
      />
    </div>
  );
};
export default ReportPage;
