import {Chip, ChipProps} from '@mui/material';
import {FC} from 'react';

interface Props extends Omit<ChipProps, 'label'> {
  role: string;
}

const RoleChip: FC<Props> = ({role, ...props}) => {
  return <Chip {...props} label={role} size="small" variant="outlined" />;
};
export default RoleChip;
