'use client';

import {Button, Stack} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {FC, useEffect, useState} from 'react';
import EventAdSelectorDialog from './EventAdSelectorDialog.client';
import EventAdDnD from './EventAdDnD.client';
import useAppId from '@/lib/store/useAppId';
import {useGetAdPlacementByAppIdList} from '@/lib/service/api-client/advertisement/advertisement';
import {AdPlacementResponseData} from '@/lib/service/api-client/model';

interface Props {
  value?: {placementId: string; sort: number}[];
  onChange?: (value: {placementId: string; sort: number}[]) => void;
}

const EventAdSelector: FC<Props> = ({value = [], onChange}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<AdPlacementResponseData[]>(
    [],
  );

  const appId = useAppId((store) => store.appId);
  const {data} = useGetAdPlacementByAppIdList(appId);

  const handleChange = (value: AdPlacementResponseData[]) => {
    setSelectedValue(value);
    onChange?.(
      value.map((item, index) => ({
        placementId: item.id,
        sort: index + 1,
      })),
    );
  };

  useEffect(() => {
    if (!data?.data.content) return;

    const initialValue = value
      .map((v) =>
        (data.data.content || []).find((item) => item.id === v.placementId),
      )
      .filter((item): item is AdPlacementResponseData => !!item);

    setSelectedValue(initialValue);
  }, [data, value]);

  return (
    <Stack spacing={2}>
      <EventAdDnD data={selectedValue} onChange={handleChange} />

      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {
          setOpen(true);
        }}
      >
        Add
      </Button>

      <EventAdSelectorDialog
        open={open}
        data={data?.data.content}
        selectedValue={selectedValue}
        onClose={() => setOpen(false)}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default EventAdSelector;
