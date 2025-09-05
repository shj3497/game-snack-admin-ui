'use client';

import dayjs from 'dayjs';
import {ApplicantPageFilter} from '../ApplicantPage';
import {FC} from 'react';
import {Stack} from '@mui/material';
import DateRange from '@/components/common/DateRange.client';
import useTableFilter from '@/lib/utils/useTableFilter';
import DebounceTextField from '@/components/common/DebounceTextField.client';
import PlatformSelect from '@/components/molecules/PlatformSelect.client';
import GameResultSelect from './GameResultSelect.client';
import RewardStatusSelect from './RewardStatusSelect.client';

interface Props extends ApplicantPageFilter {}

const ApplicantTableFilter: FC<Props> = ({
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
        <PlatformSelect
          size="small"
          value={platform}
          useDefaultValue
          onChange={(event) => {
            onFilterChange('platform', event.target.value as string);
          }}
        />
        <RewardStatusSelect
          size="small"
          value={rewardStatus}
          useDefaultValue
          onChange={(event) => {
            onFilterChange('rewardStatus', event.target.value as string);
          }}
        />
        <GameResultSelect
          size="small"
          value={win}
          useDefaultValue
          onChange={(event) => {
            onFilterChange('win', event.target.value as string);
          }}
        />
      </Stack>
      <Stack flexDirection="row" gap={2}>
        <DebounceTextField
          size="small"
          label="adid"
          value={adid}
          onChange={(event) => {
            onFilterChange('adid', encodeURIComponent(event.target.value));
          }}
        />
        <DebounceTextField
          size="small"
          label="idfa"
          value={idfa}
          onChange={(event) => {
            onFilterChange('idfa', encodeURIComponent(event.target.value));
          }}
        />
        <DebounceTextField
          size="small"
          label="clickKey"
          value={clickKey}
          onChange={(event) => {
            onFilterChange('clickKey', encodeURIComponent(event.target.value));
          }}
        />
        <DebounceTextField
          size="small"
          label="userId"
          value={userId}
          onChange={(event) => {
            onFilterChange('userId', encodeURIComponent(event.target.value));
          }}
        />
      </Stack>
    </Stack>
  );
};

export default ApplicantTableFilter;
