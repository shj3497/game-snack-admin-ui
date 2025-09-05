'use client';

import {FC} from 'react';
import {EventType, StatisticPageFilter} from '../StatisticPage';
import {TableBody, TableCell, TableFooter, TableRow} from '@mui/material';
import TablePagination from '@/components/common/TablePagination.client';
import {useGetEventEntryStatsByAppIdAndEventTypeSuspense} from '@/lib/service/api-client/events-entry/events-entry';
import useAppId from '@/lib/store/useAppId';
import dayjs from 'dayjs';

interface Props extends StatisticPageFilter {
  eventType: EventType;
  eventId: string;
}

const StatisticTableBody: FC<Props> = ({
  page = 0,
  pageSize = 10,
  fromDate = dayjs(new Date()).subtract(6, 'day').format('YYYY-MM-DD'),
  toDate = dayjs(new Date()).format('YYYY-MM-DD'),
  eventId,
}) => {
  const appId = useAppId((store) => store.appId);
  const {
    data: {data},
  } = useGetEventEntryStatsByAppIdAndEventTypeSuspense(appId, {
    page,
    size: pageSize,
    fromDate,
    toDate,
    eventId,
  });

  const totalCount = data.totalElements || 0;

  return (
    <>
      <TableBody>
        {data.content?.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} align="center">
              No data
            </TableCell>
          </TableRow>
        )}
        {data.content?.map((item) => (
          <TableRow key={item.dateKey}>
            <TableCell>{item.dateKey}</TableCell>
            <TableCell>{item.totalEntryCount}</TableCell>
            <TableCell>{item.uniqueUserCount}</TableCell>
            <TableCell>{item.rewardCompletedCount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TablePagination
          count={totalCount}
          page={page}
          rowsPerPage={pageSize}
          colSpan={9}
        />
      </TableFooter>
    </>
  );
};

export default StatisticTableBody;
