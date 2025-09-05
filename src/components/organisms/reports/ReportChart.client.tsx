'use client';

import DataChart, {ChartDataItem} from '@/components/common/DataChart.client';
import {
  useGetEventEntryStatsReportSuspense,
  useGetReportStatsExcelSuspense,
} from '@/lib/service/api-client/reports/reports';
import useAppId from '@/lib/store/useAppId';
import {FC, useMemo, useState} from 'react';
import {ReportPageFilter} from './ReportPage';
import dayjs from 'dayjs';
import {
  GetReportStatsProviderType,
  ReportStatsResponseData,
  EventEntrytatsReportReponseData,
} from '@/lib/service/api-client/model';
import {AdProviderType} from '@/components/molecules/AdProviderSelect.client';
import {Box, easing, IconButton, Stack, Tooltip} from '@mui/material';
import ExcelDownloadButton from '@/components/common/ExcelDownloadButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Props extends ReportPageFilter {}

const ReportChart: FC<Props> = ({
  fromDate: fromDateProp,
  toDate: toDateProp,
  providerType,
  placementName,
}) => {
  const fromDate =
    fromDateProp ?? dayjs(new Date()).subtract(6, 'day').format('YYYY-MM-DD');
  const toDate =
    toDateProp ?? dayjs(new Date()).subtract(1, 'day').format('YYYY-MM-DD');
  const appId = useAppId((store) => store.appId);
  const [isVisible, setIsVisible] = useState(true);

  const {
    data: {data: reportData},
  } = useGetReportStatsExcelSuspense(
    appId,
    {
      fromDate,
      toDate,
      providerType: providerType as GetReportStatsProviderType,
      placementName,
    },
    {
      query: {
        staleTime: 60 * 1000 * 5, // 5분 캐시유지
        gcTime: 60 * 1000 * 5, // 5분 캐시유지
      },
    },
  );

  const {data: eventEntryStatsData} = useGetEventEntryStatsReportSuspense(
    appId,
    {
      fromDate,
      toDate,
    },
    {
      query: {
        staleTime: 60 * 1000 * 5, // 5분 캐시유지
        gcTime: 60 * 1000 * 5, // 5분 캐시유지
      },
    },
  );

  const chartData = useMemo(() => {
    const combinedData: Record<
      string,
      ChartDataItem<AdProviderType | 'DISTINCT'>
    > = {};

    reportData.forEach((item: ReportStatsResponseData) => {
      if (!combinedData[item.dateKey]) {
        combinedData[item.dateKey] = {
          date: item.dateKey,
          ADPOPCORN: 0,
          MEZZO: 0,
          DAWIN: 0,
          GOOGLE: 0,
          DISTINCT: 0,
        };
      }
      if (item.providerType) {
        combinedData[item.dateKey][item.providerType as AdProviderType] +=
          item.revenue;
      }
    });

    eventEntryStatsData.data.forEach(
      (item: EventEntrytatsReportReponseData) => {
        if (!combinedData[item.dateKey]) {
          combinedData[item.dateKey] = {
            date: item.dateKey,
            ADPOPCORN: 0,
            MEZZO: 0,
            DAWIN: 0,
            GOOGLE: 0,
            DISTINCT: 0,
          };
        }
        combinedData[item.dateKey]['DISTINCT'] = item.uniqueUserCount;
      },
    );

    return Object.values(combinedData)
      .map((item) => ({
        ...item,
        ADPOPCORN: Number(item.ADPOPCORN.toFixed(2)),
        MEZZO: Number(item.MEZZO.toFixed(2)),
        DAWIN: Number(item.DAWIN.toFixed(2)),
        GOOGLE: Number(item.GOOGLE.toFixed(2)),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [reportData, eventEntryStatsData]);

  return (
    <Stack px={2} py={2} gap={isVisible ? 2 : 0}>
      <Stack
        overflow="hidden"
        sx={{
          maxHeight: isVisible ? '500px' : 0,
          transition: `max-height 0.3s ${easing.sharp}`,
        }}
      >
        <DataChart<AdProviderType | 'DISTINCT'>
          data={chartData}
          useTotalTooltip
          excludeFromTotal={['DISTINCT']}
          itemSorter={(a: any, b: any) => {
            if (a.dataKey === 'DISTINCT') return -1;
            if (b.dataKey === 'DISTINCT') return 1;
            return 0;
          }}
        >
          <DataChart.CustomLine
            yAxisId="right"
            dataKey="DISTINCT"
            name="순응모 수"
            stroke="#ff7300"
          />
          <DataChart.CustomArea
            yAxisId="left"
            dataKey="ADPOPCORN"
            name="AdPopcorn"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <DataChart.CustomArea
            yAxisId="left"
            dataKey="MEZZO"
            name="Mezzo"
            stackId="1"
            stroke="#ff6ce9"
            fill="#ff6ce9"
          />
          <DataChart.CustomArea
            yAxisId="left"
            dataKey="DAWIN"
            name="Dawin"
            stackId="1"
            stroke="#87c076"
            fill="#87c076"
          />
          <DataChart.CustomArea
            yAxisId="left"
            dataKey="GOOGLE"
            name="Google"
            stackId="1"
            stroke="#4386f5"
            fill="#4386f5"
          />
        </DataChart>
      </Stack>
      <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
        <ExcelDownloadButton
          data={reportData ?? []}
          fileName={`report-stats-${dayjs(fromDate).format('YYMMDD')}-${dayjs(
            toDate,
          ).format('YYMMDD')}.xlsx`}
        >
          Excel 다운로드
        </ExcelDownloadButton>
        <Tooltip title="chart 보이기/숨기기">
          <IconButton
            onClick={() => setIsVisible(!isVisible)}
            size="small"
            color="info"
          >
            {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Stack>
  );
};

export default ReportChart;
