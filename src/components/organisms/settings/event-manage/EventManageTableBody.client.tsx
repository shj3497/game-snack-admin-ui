'use client';

import TablePagination from '@/components/common/TablePagination.client';
import {useGetEventListSuspense} from '@/lib/service/api-client/events/events';
import useAppId from '@/lib/store/useAppId';
import {
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  IconButton,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {FC} from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import paths from '@/lib/utils/paths';
import {getEventDisplayName} from '@/components/molecules/EventTypeSelect.client';

interface Props {
  page?: number;
  pageSize?: number;
}

const EventManageTableBody: FC<Props> = ({page = 0, pageSize = 10}) => {
  const appId = useAppId((store) => store.appId);
  const {
    data: {data},
  } = useGetEventListSuspense(
    appId,
    {page, size: pageSize},
    {query: {retry: 1}},
  );
  const totalCount = data.totalElements || 0;

  return (
    <>
      <TableBody>
        {data.content?.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} align="center">
              No data
            </TableCell>
          </TableRow>
        )}
        {data.content?.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell align="center">
              {totalCount - (page * pageSize + index)}
            </TableCell>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.adminMenuName}</TableCell>
            <TableCell>{getEventDisplayName(item.eventType)}</TableCell>
            <TableCell align="center">{item.isView ? 'O' : 'X'}</TableCell>
            <TableCell>
              {dayjs(new Date(item.createdAt || '')).format('YYYY.MM.DD')}
            </TableCell>
            <TableCell>
              {dayjs(new Date(item.updatedAt || '')).format('YYYY.MM.DD')}
            </TableCell>
            <TableCell>
              <Link
                href={paths.workspace.settings.event.detail(item.id)}
                scroll={false}
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
          colSpan={8}
        />
      </TableFooter>
    </>
  );
};
export default EventManageTableBody;
