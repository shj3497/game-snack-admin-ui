import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import TableSuspense from '@/components/common/TableSuspense';
import UserManageTableBody from './UserManageTableBody.client';
import {FC} from 'react';

interface Props {
  page?: number;
  pageSize?: number;
  superspaceConfig?: SuperSpaceConfig;
}

const UserManageTable: FC<Props> = ({page, pageSize, superspaceConfig}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={70} align="center">
              No
            </TableCell>
            <TableCell>user info</TableCell>
            <TableCell>role</TableCell>
            <TableCell>status</TableCell>
            <TableCell width={80}></TableCell>
          </TableRow>
        </TableHead>
        <TableSuspense rowNum={10} colNum={5}>
          <UserManageTableBody
            page={page}
            pageSize={pageSize}
            superspaceConfig={superspaceConfig}
          />
        </TableSuspense>
      </Table>
    </TableContainer>
  );
};
export default UserManageTable;
