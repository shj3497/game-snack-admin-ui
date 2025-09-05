import TableSuspense from '@/components/common/TableSuspense';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ReportManageTableBody from './ReportManageTableBody.client';
import {FC} from 'react';

interface Props {
  superspaceConfig?: SuperSpaceConfig;
}

const ReportManageTable: FC<Props> = ({superspaceConfig}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={70}>No</TableCell>
            <TableCell>광고 매체</TableCell>
            <TableCell>report provider type</TableCell>
            <TableCell>report key</TableCell>
            <TableCell>commission</TableCell>
            <TableCell width={80}></TableCell>
          </TableRow>
        </TableHead>
        <TableSuspense rowNum={10} colNum={6}>
          <ReportManageTableBody superspaceConfig={superspaceConfig} />
        </TableSuspense>
      </Table>
    </TableContainer>
  );
};

export default ReportManageTable;
