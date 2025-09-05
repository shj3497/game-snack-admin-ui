'use client';

import {Divider, Paper, Stack, Typography} from '@mui/material';
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaProps,
  Line,
  LineProps,
  TooltipProps,
} from 'recharts';

type ItemSorter = (a: any, b: any) => number;

interface Props<T extends string> {
  data: ChartDataItem<T>[];
  useTotalTooltip?: boolean;
  children?: React.ReactNode;
  itemSorter?: ItemSorter;
  excludeFromTotal?: string[];
}

interface CustomAreaProps<T extends string> extends AreaProps {
  dataKey: T;
}
const CustomArea = <T extends string>({
  dataKey,
  ...props
}: CustomAreaProps<T>) => {
  return <Area type="monotone" dataKey={dataKey} {...props} />;
};
interface CustomLineProps<T extends string> extends LineProps {
  dataKey: T;
}
const CustomLine = <T extends string>({
  dataKey,
  ...props
}: CustomLineProps<T>) => {
  return <Line type="monotone" dataKey={dataKey} {...props} />;
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
  useTotalTooltip?: boolean;
  itemSorter?: (a: any, b: any) => number;
  excludeFromTotal?: string[];
}
const CustomTooltip = ({
  active,
  payload,
  label,
  useTotalTooltip = false,
  itemSorter,
  excludeFromTotal = [],
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const total = payload
      .filter((entry: any) => !excludeFromTotal.includes(entry.dataKey))
      .reduce((sum: number, entry: any) => sum + (entry.value as number), 0);

    const sortedPayload = itemSorter ? [...payload].sort(itemSorter) : payload;

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
        {sortedPayload.map((entry: any, index: number) => (
          <Typography
            key={`item-${index}`}
            variant="body2"
            sx={{
              color: entry.stroke,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>{entry.name} :</span>
            <span>
              {(entry.value as number).toLocaleString('ko-KR', {
                minimumFractionDigits: excludeFromTotal.includes(entry.dataKey)
                  ? 0
                  : 2,
                maximumFractionDigits: excludeFromTotal.includes(entry.dataKey)
                  ? 0
                  : 2,
              })}
            </span>
          </Typography>
        ))}
        {useTotalTooltip && (
          <>
            <Divider sx={{my: 1, borderColor: '#e6e6e6'}} />
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#545454',
              }}
            >
              <span>TOTAL :</span>
              <span>
                {total.toLocaleString('ko-KR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </Typography>
          </>
        )}
      </Paper>
    );
  }

  return null;
};

export type ChartDataItem<T extends string> = {
  date: string;
} & Record<T, number>;

const DataChart = <T extends string>({
  data,
  useTotalTooltip = false,
  children,
  itemSorter,
  excludeFromTotal,
}: Props<T>) => {
  return (
    <Stack justifyContent="center" alignItems="center" width="100%">
      <ResponsiveContainer width="100%" height={300} style={{outline: 'none'}}>
        <ComposedChart data={data} style={{outline: 'none'}}>
          <CartesianGrid strokeDasharray="3 5" />
          <XAxis dataKey="date" tickMargin={10} />
          <YAxis yAxisId="left" tickMargin={10} />
          <YAxis yAxisId="right" orientation="right" tickMargin={10} />
          <Tooltip
            content={(props) => (
              <CustomTooltip
                {...props}
                useTotalTooltip={useTotalTooltip}
                itemSorter={itemSorter}
                excludeFromTotal={excludeFromTotal}
              />
            )}
          />
          {children}
        </ComposedChart>
      </ResponsiveContainer>
    </Stack>
  );
};

DataChart.CustomArea = CustomArea;
DataChart.CustomLine = CustomLine;

export default DataChart;
