import {Stack, TextField} from '@mui/material';
import {AdOrderType} from '@/components/molecules/AdTypeSelect.client';
import {FC} from 'react';
import {useFormContext} from 'react-hook-form';

interface Props {
  name?: string;
  adOrderType?: AdOrderType | (string & {}) | null;
}

export type AdPopcornConfig = {
  name: string;
  appKey: string;
  placementId: string;
};

export type MezzoConfig = {
  name: string;
  publisher: string;
  media: string;
  section: string;
};
export type DawinConfig = {
  name: string;
  adSlotId: string;
};
export type GptConfig = {
  name: string;
  adUnitPath: string;
};

const AdConfigField: FC<Props> = ({name, adOrderType}) => {
  const {register} = useFormContext();

  if (
    adOrderType === 'adpopcorn_interstitial' ||
    adOrderType === 'adpopcorn_video'
  ) {
    return (
      <Stack spacing={1}>
        <TextField
          {...register(`${name}.name`)}
          size="small"
          fullWidth
          label="name"
          required
        />
        <TextField
          {...register(`${name}.appKey`)}
          size="small"
          fullWidth
          label="app_key"
          required
        />
        <TextField
          {...register(`${name}.placementId`)}
          size="small"
          fullWidth
          label="placement_id"
          required
        />
      </Stack>
    );
  } else if (
    adOrderType === 'mezzo_interstitial' ||
    adOrderType === 'mezzo_video'
  ) {
    return (
      <Stack spacing={1}>
        <TextField
          {...register(`${name}.name`)}
          size="small"
          fullWidth
          label="name"
          required
        />
        <TextField
          {...register(`${name}.publisher`)}
          size="small"
          fullWidth
          label="publisher"
          required
        />
        <TextField
          {...register(`${name}.media`)}
          size="small"
          fullWidth
          label="media"
          required
        />
        <TextField
          {...register(`${name}.section`)}
          size="small"
          fullWidth
          label="section"
          required
        />
      </Stack>
    );
  } else if (adOrderType === 'dawin_video') {
    return (
      <Stack spacing={1}>
        <TextField
          {...register(`${name}.name`)}
          size="small"
          fullWidth
          label="name"
          required
        />
        <TextField
          {...register(`${name}.adSlotId`)}
          size="small"
          fullWidth
          label="ad_slot_id"
          required
        />
      </Stack>
    );
  } else if (
    adOrderType === 'gpt_interstitial' ||
    adOrderType === 'gpt_reward'
  ) {
    return (
      <Stack spacing={1}>
        <TextField
          {...register(`${name}.name`)}
          size="small"
          fullWidth
          label="name"
          required
        />
        <TextField
          {...register(`${name}.adUnitPath`)}
          size="small"
          fullWidth
          label="ad_unit_path"
          required
        />
      </Stack>
    );
  }

  return null;
};

export default AdConfigField;
