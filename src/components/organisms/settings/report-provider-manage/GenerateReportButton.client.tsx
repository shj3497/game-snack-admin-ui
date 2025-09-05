'use client';

import {Button, ButtonProps, Tooltip} from '@mui/material';
import AddChartIcon from '@mui/icons-material/AddchartOutlined';
import {FC} from 'react';
import {useSaveReportStats} from '@/lib/service/api-client/batch/batch';
import useAlert from '@/lib/utils/useAlert';
import dayjs from 'dayjs';

type Props = {
  appId: string;
} & ButtonProps;

const GenerateReportButton: FC<Props> = ({
  appId,
  children,
  onClick,
  ...props
}) => {
  const {showAlert} = useAlert();
  const {mutate, isPending} = useSaveReportStats({
    mutation: {
      onSuccess: () => {
        showAlert({
          variant: 'success',
          message: 'Report 생성이 완료되었습니다.',
        });
      },
      onError: (error: any) => {
        const message =
          error?.response?.message || 'Report 생성에 실패했습니다.';
        showAlert({
          variant: 'error',
          message,
        });
      },
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    mutate({
      appId,
      params: {
        fromDate: dayjs(new Date()).subtract(3, 'day').format('YYYY-MM-DD'),
        toDate: dayjs(new Date()).subtract(1, 'day').format('YYYY-MM-DD'),
      },
    });
  };

  return (
    <Tooltip title="클릭 시 리포트 생성을 시작합니다.">
      <Button
        {...props}
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<AddChartIcon />}
        sx={{color: 'white'}}
        onClick={handleClick}
        loading={isPending}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export default GenerateReportButton;
