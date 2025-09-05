'use client';

import TablePagination from '@/components/common/TablePagination.client';
import {useGetReportStatsSuspense} from '@/lib/service/api-client/reports/reports';
import useAppId from '@/lib/store/useAppId';
import {TableBody, TableCell, TableFooter, TableRow} from '@mui/material';
import {ChangeEvent, FC} from 'react';
import {ReportPageFilter} from './ReportPage';
import {GetReportStatsProviderType} from '@/lib/service/api-client/model/getReportStatsProviderType';
import useTableFilter from '@/lib/utils/useTableFilter';
import dayjs from 'dayjs';

interface Props extends ReportPageFilter {}

const ReportTableBody: FC<Props> = ({
  page = 0,
  pageSize = 10,
  fromDate = dayjs(new Date()).subtract(6, 'day').format('YYYY-MM-DD'),
  toDate = dayjs(new Date()).subtract(1, 'day').format('YYYY-MM-DD'),
  providerType,
  placementName,
}) => {
  const appId = useAppId((store) => store.appId);
  const {
    data: {data},
  } = useGetReportStatsSuspense(appId, {
    page,
    size: pageSize,
    fromDate,
    toDate,
    providerType: providerType as GetReportStatsProviderType,
    placementName,
  });

  const {onRowsPerPageChange: rowsPerPageChange} = useTableFilter();

  const onRowsPerPageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    rowsPerPageChange(Number(event.target.value));
  };

  const totalCount = data.totalElements || 0;

  return (
    <>
      <TableBody>
        {data.content?.length === 0 && (
          <TableRow>
            <TableCell colSpan={9} align="center">
              No data
            </TableCell>
          </TableRow>
        )}
        {data.content?.map((row, index) => (
          <TableRow key={`${row.appId}_${row.dateKey}_${index}`}>
            <TableCell>{row.dateKey}</TableCell>
            <TableCell>{row.providerType}</TableCell>
            <TableCell>{row.placementName}</TableCell>
            <TableCell>{row.request}</TableCell>
            <TableCell>{row.impression}</TableCell>
            <TableCell>{row.click}</TableCell>
            <TableCell>{row.revenue}</TableCell>
            <TableCell>{row.ecpm}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TablePagination
          count={totalCount}
          page={page}
          rowsPerPage={pageSize}
          colSpan={8}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </TableFooter>
    </>
  );
};

export default ReportTableBody;
