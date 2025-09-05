import {FC} from 'react';
import ApplicantTable from './common/ApplicantTable';

type EventType = 'CATCH' | 'FIND' | 'DRAW' | 'ROULETTE' | 'UNKNOWN';
export interface ApplicantPageFilter {
  page?: number;
  pageSize?: number;
  fromDate?: string;
  toDate?: string;
  adid?: string;
  idfa?: string;
  platform?: 'IOS' | 'ANDROID' | 'ETC';
  clickKey?: string;
  userId?: string;
  win?: string;
  rewardStatus?: 'SUCCESS' | 'FAILED' | 'NONE';
}

interface Props extends ApplicantPageFilter {
  eventType: EventType;
  eventId: string;
}

const ApplicantPage: FC<Props> = async ({eventType, eventId, ...props}) => {
  return (
    <div>
      <ApplicantTable {...props} eventId={eventId} />
    </div>
  );
};

export default ApplicantPage;
