import TableSuspense from '@/components/common/TableSuspense';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
import {FC} from 'react';
import AllUserManageTableBody from './AllUserManageTableBody.client';

interface Props {
  page?: number;
  pageSize?: number;
}

const AllUserManageTable: FC<Props> = ({page, pageSize}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={70} align="center">
              No
            </TableCell>
            <TableCell>user info</TableCell>
            <TableCell>user id</TableCell>
            <TableCell>app id</TableCell>
            <TableCell>role</TableCell>
            <TableCell>status</TableCell>
          </TableRow>
        </TableHead>
        <TableSuspense rowNum={10} colNum={6}>
          <AllUserManageTableBody page={page} pageSize={pageSize} />
        </TableSuspense>
      </Table>
    </TableContainer>
  );
};
export default AllUserManageTable;
