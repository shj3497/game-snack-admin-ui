import {Chip} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import {FC} from 'react';

interface Props {
  status: string;
}

const StatusChip: FC<Props> = ({status}) => {
  const isDisabled = status.toLocaleLowerCase() === 'disabled';
  const isEnabled = status.toLocaleLowerCase() === 'enabled';

  const renderIcon = () => {
    if (isDisabled) {
      return <RemoveCircleOutlineIcon color="error" />;
    } else if (isEnabled) {
      return <CheckCircleIcon color="info" />;
    }
    return <></>;
  };

  return (
    <Chip
      icon={renderIcon()}
      label={status}
      size="small"
      variant="outlined"
      sx={{textTransform: 'capitalize'}}
    />
  );
};

export default StatusChip;
