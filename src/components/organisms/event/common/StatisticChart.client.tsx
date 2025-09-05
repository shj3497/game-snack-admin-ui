'use client';

import {EventType, StatisticPageFilter} from '../StatisticPage';
import {FC, useMemo, useState} from 'react';
import dayjs from 'dayjs';
import useAppId from '@/lib/store/useAppId';
import {useGetEventEntryStatsExcelSuspense} from '@/lib/service/api-client/events-entry/events-entry';
import {
  Box,
  Divider,
  easing,
  IconButton,
  Tooltip as MuiTooltip,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ExcelDownloadButton from '@/components/common/ExcelDownloadButton';

interface Props extends StatisticPageFilter {
  eventType: EventType;
  eventId: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  useTotalTooltip = false,
}: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce(
      (sum: number, entry: any) => sum + (entry.value as number),
      0,
    );

    return (
      <Paper
        sx={{
          p: 2,
          minWidth: '250px',
        }}
      >
        <Typography variant="subtitle2" mb={1}>
          {label}
        </Typography>
        {payload.map((entry: any, index: number) => (
          <Typography
            key={`item-${index}`}
            variant="body2"
            sx={{
              color: entry.color,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>{entry.name} :</span>
            <span>{(entry.value as number).toLocaleString('ko-KR')}</span>
          </Typography>
        ))}
        {useTotalTooltip && (
          <>
            <Divider sx={{my: 1}} />
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>TOTAL :</span>
              <span>{total.toLocaleString('ko-KR')}</span>
            </Typography>
          </>
        )}
      </Paper>
    );
  }

  return null;
};

const StatisticChart: FC<Props> = ({
  eventType,
  fromDate = dayjs(new Date()).subtract(6, 'day').format('YYYY-MM-DD'),
  toDate = dayjs(new Date()).format('YYYY-MM-DD'),
  eventId,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const appId = useAppId((store) => store.appId);

  const {
    data: {data},
  } = useGetEventEntryStatsExcelSuspense(appId, {
    fromDate,
    toDate,
    eventId,
  });

  const chartData = useMemo(() => {
    if (!data) return [];

    return data

      .map((item) => {
        return {
          date: item.dateKey,
          순응모: item.uniqueUserCount,
          참여완료: item.rewardCompletedCount,
          전체응모: item.totalEntryCount,
        };
      })
      .sort((a, b) => +a.date - +b.date);
  }, [data]);

  return (
    <Stack px={2} py={2} gap={isVisible ? 2 : 0}>
      <Stack
        overflow="hidden"
        sx={{
          maxHeight: isVisible ? '500px' : 0,
          transition: `max-height 0.3s ${easing.sharp}`,
        }}
      >
        <Stack justifyContent="center" alignItems="center" width="100%">
          <ResponsiveContainer
            width="100%"
            height={300}
            style={{outline: 'none'}}
          >
            <LineChart data={chartData} style={{outline: 'none'}}>
              <CartesianGrid strokeDasharray="3 5" />
              <XAxis dataKey="date" tickMargin={10} />
              <YAxis tickMargin={10} />
              <Tooltip content={<CustomTooltip />} />

              <Line type="monotone" dataKey="순응모" stroke="#ffc658" />
              <Line type="monotone" dataKey="참여완료" stroke="#ff6384" />
              <Line type="monotone" dataKey="전체응모" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Stack>
      </Stack>
      <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
        <ExcelDownloadButton
          data={data}
          fileName={`catch-second-stats-${dayjs(fromDate).format('YYMMDD')}-${dayjs(toDate).format('YYMMDD')}.xlsx`}
        >
          Excel 다운로드
        </ExcelDownloadButton>
        <MuiTooltip title="chart 보이기/숨기기">
          <IconButton
            onClick={() => setIsVisible(!isVisible)}
            size="small"
            color="info"
          >
            {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </MuiTooltip>
      </Box>
    </Stack>
  );
};

export default StatisticChart;
