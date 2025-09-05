'use client';

import {FC} from 'react';
import {ApplicantPageFilter} from '../ApplicantPage';
import {
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Tooltip,
} from '@mui/material';
import TablePagination from '@/components/common/TablePagination.client';
import {useGetEventByAppIdListSuspense} from '@/lib/service/api-client/events-entry/events-entry';
import useAppId from '@/lib/store/useAppId';
import dayjs from 'dayjs';
import RewardStatusChip from '../common/RewardStatusChip.client';

interface Props extends ApplicantPageFilter {
  eventId: string;
}

const ApplicantTableBody: FC<Props> = ({
  eventId,
  page = 0,
  pageSize = 10,
  fromDate = dayjs(new Date()).subtract(6, 'day').format('YYYY-MM-DD'),
  toDate = dayjs(new Date()).format('YYYY-MM-DD'),
  adid,
  idfa,
  platform,
  clickKey,
  userId,
  win,
  rewardStatus,
}) => {
  const appId = useAppId((store) => store.appId);
  const {
    data: {data},
  } = useGetEventByAppIdListSuspense(appId, eventId, {
    page,
    size: pageSize,
    fromDate,
    toDate,
    adid,
    idfa,
    platform,
    clickKey,
    userId,
    win: win === 'true' ? true : win === 'false' ? false : undefined,
    rewardStatus,
  });

  const totalCount = data.totalElements || 0;

  return (
    <>
      <TableBody>
        {data.content?.length === 0 && (
          <TableRow>
            <TableCell colSpan={11} align="center">
              No data
            </TableCell>
          </TableRow>
        )}
        {data.content?.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>{totalCount - (page * pageSize + index)}</TableCell>
            <TableCell>
              <Tooltip title={!!item.adid ? 'adid' : !!item.idfa ? 'idfa' : ''}>
                <span>{item.adid || item.idfa}</span>
              </Tooltip>
            </TableCell>
            <TableCell>{item.platform}</TableCell>
            <TableCell sx={{wordBreak: 'break-all'}}>{item.clickKey}</TableCell>
            <TableCell>{item.userId}</TableCell>
            <TableCell align="center">
              {item.data ? JSON.stringify(item.data) : ''}
            </TableCell>
            <TableCell align="center">
              {item.createdAt
                ? dayjs(new Date(item.createdAt)).format('YYYY.MM.DD HH:mm:ss')
                : ''}
            </TableCell>
            <TableCell align="center">{item.win ? 'O' : 'X'}</TableCell>
            <TableCell align="center">
              <RewardStatusChip status={item.rewardStatus} />
            </TableCell>
            <TableCell align="center">
              {item.rewardedAt
                ? dayjs(new Date(item.rewardedAt)).format('YYYY.MM.DD HH:mm:ss')
                : ''}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TablePagination
          count={totalCount}
          page={page}
          rowsPerPage={pageSize}
          colSpan={11}
        />
      </TableFooter>
    </>
  );
};
export default ApplicantTableBody;
