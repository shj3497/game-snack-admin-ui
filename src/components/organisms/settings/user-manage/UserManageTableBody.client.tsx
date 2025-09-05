'use client';

import RoleChip from '@/components/atoms/RoleChip';
import StatusChip from '@/components/atoms/StatusChip';
import {useAdminAuthListSuspense} from '@/lib/service/api-client/admin-auth/admin-auth';
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Typography,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import paths from '@/lib/utils/paths';
import Link from 'next/link';
import useAppId from '@/lib/store/useAppId';
import {FC} from 'react';
import TablePagination from '@/components/common/TablePagination.client';
import useAlert from '@/lib/utils/useAlert';

interface Props {
  page?: number;
  pageSize?: number;
  superspaceConfig?: SuperSpaceConfig;
}

const UserManageTableBody: FC<Props> = ({
  page = 0,
  pageSize = 10,
  superspaceConfig,
}) => {
  const isSuperspace = !!superspaceConfig;
  const storedAppId = useAppId((store) => store.appId);
  const appId = isSuperspace ? superspaceConfig.appId : storedAppId;
  const filterPrefix = isSuperspace ? superspaceConfig.filterPrefix : undefined;

  const {
    data: {data},
  } = useAdminAuthListSuspense(appId, {
    page,
    size: pageSize,
  });
  const {showAlert} = useAlert();

  const linkPath = (userId: string) =>
    isSuperspace
      ? paths.superspace.settings.app.user.detail(appId, userId)
      : paths.workspace.settings.user.detail(userId);

  const totalCount = data.totalElements || 0;
  const defaultIndex = page * pageSize;

  return (
    <>
      <TableBody>
        {data.content?.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} align="center">
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
            <TableCell>
              <Box display="flex" gap={1}>
                <RoleChip key={row.roles[0].role} role={row.roles[0].role} />
              </Box>
            </TableCell>
            <TableCell>
              <StatusChip status={row.enabled ? 'enabled' : 'disabled'} />
            </TableCell>
            <TableCell>
              <Link href={linkPath(row.id)} scroll={false}>
                <IconButton>
                  <VisibilityOutlinedIcon />
                </IconButton>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TablePagination
          count={totalCount}
          page={page}
          rowsPerPage={pageSize}
          colSpan={5}
          prefix={filterPrefix}
        />
      </TableFooter>
    </>
  );
};
export default UserManageTableBody;
