import {styled} from '@mui/material';
import classNames from 'classnames';
import {FC} from 'react';

interface Props {
  status: 'SUCCESS' | 'FAILED' | 'PROCESSING' | 'NONE';
}

const Chip = styled('span')`
  border-radius: 100px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  &.default {
    background-color: #e0e0e0;
    color: #000;
  }
  &.success {
    background-color: ${({theme}) => theme.palette.success[100]};
    color: ${({theme}) => theme.palette.success.main};
  }
  &.error {
    background-color: ${({theme}) => theme.palette.error[100]};
    color: ${({theme}) => theme.palette.error.main};
  }
  &.processing {
    background-color: ${({theme}) => theme.palette.info[100]};
    color: ${({theme}) => theme.palette.info.main};
  }
`;

const RewardStatusChip: FC<Props> = ({status}) => {
  let color = 'default';
  if (status === 'SUCCESS') {
    color = 'success';
  } else if (status === 'FAILED') {
    color = 'error';
  } else if (status === 'PROCESSING') {
    color = 'processing';
  }
  return (
    <Chip className={classNames('reward-status-chip', color)}>{status}</Chip>
  );
};

export default RewardStatusChip;
