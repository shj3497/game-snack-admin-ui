import {FC} from 'react';
import StatisticTable from './common/StatisticTable';
import {GetEventEntryStatsByAppIdAndEventTypeEventType} from '@/lib/service/api-server/model';

export interface StatisticPageFilter {
  page?: number;
  pageSize?: number;
  fromDate?: string;
  toDate?: string;
}

export type EventType = GetEventEntryStatsByAppIdAndEventTypeEventType;

interface Props extends StatisticPageFilter {
  eventType: EventType;
  eventId: string;
}

const StatisticPage: FC<Props> = ({eventId, ...props}) => {
  return (
    <div>
      <StatisticTable eventId={eventId} {...props} />
    </div>
  );
};
export default StatisticPage;
