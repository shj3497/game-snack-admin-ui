'use client';

import DateRange from '@/components/common/DateRange.client';
import {Stack} from '@mui/material';
import dayjs from 'dayjs';
import {FC} from 'react';
import useTableFilter from '@/lib/utils/useTableFilter';
import {StatisticPageFilter} from '../StatisticPage';

interface Props extends StatisticPageFilter {}

const StatisticTableFilter: FC<Props> = ({
  fromDate = dayjs(new Date()).subtract(6, 'day').format('YYYY-MM-DD'),
  toDate = dayjs(new Date()).format('YYYY-MM-DD'),
}) => {
  const {onFromDateChange, onToDateChange} = useTableFilter();

  return (
    <Stack px={2} py={3} gap={2}>
      <Stack flexDirection="row" gap={2}>
        <DateRange
          label="시작일"
          slotProps={{textField: {size: 'small'}}}
          onChange={(value) =>
            onFromDateChange(dayjs(value).format('YYYY-MM-DD'))
          }
          value={!fromDate ? null : dayjs(fromDate)}
        />
        <DateRange
          label="종료일"
          slotProps={{textField: {size: 'small'}}}
          onChange={(value) =>
            onToDateChange(dayjs(value).format('YYYY-MM-DD'))
          }
          value={!toDate ? null : dayjs(toDate)}
        />
      </Stack>
    </Stack>
  );
};
export default StatisticTableFilter;
