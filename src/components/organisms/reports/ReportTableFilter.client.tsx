'use client';

import DateRange from '@/components/common/DateRange.client';
import {Stack} from '@mui/material';
import dayjs from 'dayjs';
import {FC} from 'react';
import useTableFilter from '@/lib/utils/useTableFilter';
import AdProviderSelect from '@/components/molecules/AdProviderSelect.client';
import {ReportPageFilter} from './ReportPage';
import DebounceTextField from '@/components/common/DebounceTextField.client';
import SearchIcon from '@mui/icons-material/Search';

interface ReportTableFilterProps extends ReportPageFilter {}

const ReportTableFilter: FC<ReportTableFilterProps> = ({
  fromDate = dayjs(new Date()).subtract(6, 'day').format('YYYY-MM-DD'),
  toDate = dayjs(new Date()).subtract(1, 'day').format('YYYY-MM-DD'),
  providerType = '',
  placementName = '',
}) => {
  const {onFromDateChange, onToDateChange, onFilterChange} = useTableFilter();
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

        <AdProviderSelect
          size="small"
          value={providerType}
          useDefaultValue
          onChange={(event) => {
            onFilterChange('providerType', event.target.value as string);
          }}
        />
      </Stack>

      <DebounceTextField
        size="small"
        sx={{width: '50%'}}
        slotProps={{input: {startAdornment: <SearchIcon sx={{mr: 1}} />}}}
        placeholder="지면 검색"
        value={placementName}
        onChange={(event) => {
          onFilterChange(
            'placementName',
            encodeURIComponent(event.target.value) as string,
          );
        }}
      />
    </Stack>
  );
};
export default ReportTableFilter;
