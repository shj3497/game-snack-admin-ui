import TableSuspense from '@/components/common/TableSuspense';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {FC} from 'react';
import AdManageTableBody from './AdManageTableBody.client';
import AdManageTableFilter from './AdManageTableFilter.client';
import {AdManagePageFilter} from './AdManagePage';

interface Props extends AdManagePageFilter {}

const AdManageTable: FC<Props> = ({...props}) => {
  return (
    <TableContainer>
      <AdManageTableFilter {...props} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={70}>No</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>설명</TableCell>
            <TableCell>광고 매체</TableCell>
            <TableCell>광고 타입</TableCell>
            <TableCell width={120}>Created</TableCell>
            <TableCell width={120}>Updated</TableCell>
            <TableCell width={80}></TableCell>
          </TableRow>
        </TableHead>
        <TableSuspense rowNum={10} colNum={8}>
          <AdManageTableBody {...props} />
        </TableSuspense>
      </Table>
    </TableContainer>
  );
};
export default AdManageTable;
