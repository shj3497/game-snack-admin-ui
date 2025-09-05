import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {FC} from 'react';
import {EventType, StatisticPageFilter} from '../StatisticPage';
import StatisticTableFilter from './StatisticTableFilter.client';
import TableSuspense from '@/components/common/TableSuspense';
import StatisticTableBody from './StatisticTableBody.client';
import DataChartSuspense from '@/components/common/DataChartSuspense';
import StatisticChart from './StatisticChart.client';

interface Props extends StatisticPageFilter {
  eventType: EventType;
  eventId: string;
}

const StatisticTable: FC<Props> = ({...props}) => {
  return (
    <TableContainer>
      <StatisticTableFilter {...props} />
      <DataChartSuspense>
        <StatisticChart {...props} />
      </DataChartSuspense>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>날짜</TableCell>
            <TableCell>전체응모</TableCell>
            <TableCell>순응모</TableCell>
            <TableCell>참여완료</TableCell>
          </TableRow>
        </TableHead>
        <TableSuspense rowNum={10} colNum={4}>
          <StatisticTableBody {...props} />
        </TableSuspense>
      </Table>
    </TableContainer>
  );
};
export default StatisticTable;
