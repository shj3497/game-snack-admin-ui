'use client';

import RoleChip from '@/components/atoms/RoleChip';
import StatusChip from '@/components/atoms/StatusChip';
import TablePagination from '@/components/common/TablePagination.client';
import {useAdminAuthListAllUsersSuspense} from '@/lib/service/api-client/admin-auth/admin-auth';
import {
  Avatar,
  Box,
  Stack,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Typography,
} from '@mui/material';
import {FC} from 'react';
import Link from 'next/link';
import paths from '@/lib/utils/paths';

interface Props {
  page?: number;
  pageSize?: number;
}

const AllUserManageTableBody: FC<Props> = ({page = 0, pageSize = 10}) => {
  const {
    data: {data},
  } = useAdminAuthListAllUsersSuspense({
    page,
    size: pageSize,
  });

  const totalCount = data.totalElements || 0;

  return (
    <>
      <TableBody>
        {data.content?.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} align="center">
              No data
            </TableCell>
          </TableRow>
        )}
        {data.content?.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell align="center">
              {totalCount - (page * pageSize + index)}
            </TableCell>
            <TableCell>
              <Stack flexDirection="row" gap={1} alignItems="center">
                <Avatar />
                <Stack ml={1}>
                  <Typography variant="body2">{row.fullName}</Typography>
                  <Typography variant="caption" sx={{color: 'rgba(0,0,0,0.6)'}}>
                    {row.email}
                  </Typography>
                </Stack>
              </Stack>
            </TableCell>
            <TableCell>{row.username}</TableCell>
            <TableCell>
              <Typography
                color="primary"
                variant="subtitle2"
                component={Link}
                href={paths.superspace.settings.app.detail(row.appId as string)}
              >
                {row.appId}
              </Typography>
            </TableCell>
            <TableCell>
              <Box display="flex" gap={1}>
                <RoleChip key={row.roles[0].role} role={row.roles[0].role} />
              </Box>
            </TableCell>
            <TableCell>
              <StatusChip status={row.enabled ? 'enabled' : 'disabled'} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TablePagination
          count={totalCount}
          page={page}
          rowsPerPage={pageSize}
          colSpan={6}
        />
      </TableFooter>
    </>
  );
};
export default AllUserManageTableBody;
