import TableSuspense from '@/components/common/TableSuspense';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {FC} from 'react';
import EventManageTableBody from './EventManageTableBody.client';

interface Props {
  page?: number;
  pageSize?: number;
}

const EventManageTable: FC<Props> = ({page, pageSize}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={70}>No</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>이벤트 이름</TableCell>
            <TableCell>이벤트 종류</TableCell>
            <TableCell width={120} align="center">
              이벤트 공개
            </TableCell>
            <TableCell width={120}>Created</TableCell>
            <TableCell width={120}>Updated</TableCell>
            <TableCell width={80}></TableCell>
          </TableRow>
        </TableHead>

        <TableSuspense rowNum={10} colNum={8}>
          <EventManageTableBody page={page} pageSize={pageSize} />
        </TableSuspense>
      </Table>
    </TableContainer>
  );
};
export default EventManageTable;
