'use client';

import React, {FC} from 'react';
import {Stack} from '@mui/material';
import DebounceTextField from '@/components/common/DebounceTextField.client';
import SearchIcon from '@mui/icons-material/Search';
import AdTypeSelect from '@/components/molecules/AdTypeSelect.client';
import AdProviderSelect from '@/components/molecules/AdProviderSelect.client';
import useTableFilter from '@/lib/utils/useTableFilter';
import {AdManagePageFilter} from './AdManagePage';

interface Props extends AdManagePageFilter {}

const AdManageTableFilter: FC<Props> = ({
  name = '',
  providerType = '',
  adOrderType = '',
}) => {
  const {onFilterChange} = useTableFilter();
  return (
    <Stack px={2} py={3} gap={2}>
      <Stack flexDirection="row" gap={2}>
        <AdTypeSelect
          size="small"
          useDefaultValue
          value={adOrderType}
          onChange={(event) => {
            onFilterChange('adOrderType', event.target.value as string);
          }}
          sx={{
            width: '180px',
          }}
        />
        <AdProviderSelect
          size="small"
          useDefaultValue
          value={providerType}
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
        value={name}
        onChange={(event) => {
          onFilterChange(
            'name',
            encodeURIComponent(event.target.value) as string,
          );
        }}
      />
    </Stack>
  );
};

export default AdManageTableFilter;
