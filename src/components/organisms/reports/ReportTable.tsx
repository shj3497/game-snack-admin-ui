import TableSuspense from '@/components/common/TableSuspense';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ReportTableBody from './ReportTableBody.client';
import {FC} from 'react';
import ReportTableFilter from './ReportTableFilter.client';
import {ReportPageFilter} from './ReportPage';
import ReportChart from './ReportChart.client';
import DataChartSuspense from '@/components/common/DataChartSuspense';

interface Props extends ReportPageFilter {}

const ReportTable: FC<Props> = ({
  page = 0,
  pageSize = 10,
  fromDate,
  toDate,
  providerType,
  placementName,
}) => {
  return (
    <TableContainer>
      <ReportTableFilter
        fromDate={fromDate}
        toDate={toDate}
        providerType={providerType}
        placementName={placementName}
      />
      <DataChartSuspense>
        <ReportChart
          fromDate={fromDate}
          toDate={toDate}
          providerType={providerType}
          placementName={placementName}
        />
      </DataChartSuspense>
      <Table sx={{minWidth: 1000}}>
        <TableHead>
          <TableRow>
            <TableCell>날짜</TableCell>
            <TableCell>업체</TableCell>
            <TableCell>지면</TableCell>
            <TableCell>요청수</TableCell>
            <TableCell>노출수</TableCell>
            <TableCell>클릭</TableCell>
            <TableCell>수익</TableCell>
            <TableCell>eCPM</TableCell>
          </TableRow>
        </TableHead>
        <TableSuspense rowNum={10} colNum={8}>
          <ReportTableBody
            page={page}
            pageSize={pageSize}
            fromDate={fromDate}
            toDate={toDate}
            providerType={providerType}
            placementName={placementName}
          />
        </TableSuspense>
      </Table>
    </TableContainer>
  );
};
export default ReportTable;
