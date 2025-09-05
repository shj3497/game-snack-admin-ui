import TableSuspense from '@/components/common/TableSuspense';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {FC} from 'react';
import AppManageTableBody from './AppManageTableBody.client';

interface Props {
  page?: number;
  pageSize?: number;
}

const AppManageTable: FC<Props> = ({page, pageSize}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={70}>No</TableCell>
            <TableCell>app id</TableCell>
            <TableCell>app name</TableCell>
            <TableCell>postback url</TableCell>
            <TableCell>hashKey</TableCell>
            <TableCell width={40}></TableCell>
          </TableRow>
        </TableHead>
        <TableSuspense rowNum={10} colNum={6}>
          <AppManageTableBody page={page} pageSize={pageSize} />
        </TableSuspense>
      </Table>
    </TableContainer>
  );
};

export default AppManageTable;
