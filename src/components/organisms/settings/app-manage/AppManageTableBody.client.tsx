'use client';

import TablePagination from '@/components/common/TablePagination.client';
import {useGetAppListSuspense} from '@/lib/service/api-client/apps/apps';
import {
  IconButton,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Typography,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {FC, MouseEvent} from 'react';
import paths from '@/lib/utils/paths';
import Link from 'next/link';
import useAppId from '@/lib/store/useAppId';
import {AppResponseData} from '@/lib/service/api-client/model';
import {useRouter} from 'next/navigation';

interface Props {
  page?: number;
  pageSize?: number;
}

const AppManageTableBody: FC<Props> = ({page = 0, pageSize = 10}) => {
  const setAppInfo = useAppId((store) => store.setAppInfo);
  const router = useRouter();
  const {
    data: {data},
  } = useGetAppListSuspense({page, size: pageSize});
  const totalCount = data?.totalElements || 0;
  const defaultIndex = page * pageSize;

  const handlePageGo = (
    event: MouseEvent<HTMLAnchorElement>,
    data: AppResponseData,
  ) => {
    event.preventDefault();
    setAppInfo({
      label: data.appName,
      value: data.appId || '',
    });
    router.push(paths.workspace.main);
    router.refresh();
  };
  return (
    <>
      <TableBody>
        {data?.content?.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} align="center">
              No data
            </TableCell>
          </TableRow>
        )}
        {data?.content?.map((row, index) => (
          <TableRow key={row.appId}>
            <TableCell align="center">
              {totalCount - (page * pageSize + index)}
            </TableCell>
            <TableCell>
              <Typography
                color="primary"
                variant="subtitle2"
                component={Link}
                href={paths.workspace.main}
                onClick={(event) => handlePageGo(event, row)}
              >
                {row.appId}
              </Typography>
            </TableCell>
            <TableCell>{row.appName}</TableCell>
            <TableCell>{row.postbackUrl}</TableCell>
            <TableCell>{row.hashKey}</TableCell>
            <TableCell>
              <Link
                href={paths.superspace.settings.app.detail(row.appId || '')}
              >
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
          colSpan={6}
        />
      </TableFooter>
    </>
  );
};

export default AppManageTableBody;
