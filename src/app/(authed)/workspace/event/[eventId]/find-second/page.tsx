import ApplicantPage, {
  ApplicantPageFilter,
} from '@/components/organisms/event/ApplicantPage';
import EventLayout from '@/components/organisms/event/EventLayout';

interface Props {
  params: {
    eventId: string;
  };
  searchParams: SearchParams;
}

const page = async (props: Props) => {
  const {
    page: _page,
    pageSize: _pageSize,
    fromDate: _fromDate,
    toDate: _toDate,
    adid: _adid,
    idfa: _idfa,
    platform: _platform,
    clickKey: _clickKey,
    userId: _userId,
    win: _win,
    rewardStatus: _rewardStatus,
  } = await props.searchParams;
  const {eventId} = await props.params;

  const page = typeof _page === 'string' ? +_page : 0;
  const pageSize = typeof _pageSize === 'string' ? +_pageSize : 10;
  const fromDate = typeof _fromDate === 'string' ? _fromDate : undefined;
  const toDate = typeof _toDate === 'string' ? _toDate : undefined;
  const adid =
    typeof _adid === 'string' ? decodeURIComponent(_adid) : undefined;
  const idfa =
    typeof _idfa === 'string' ? decodeURIComponent(_idfa) : undefined;
  const platform = typeof _platform === 'string' ? _platform : undefined;
  const clickKey =
    typeof _clickKey === 'string' ? decodeURIComponent(_clickKey) : undefined;
  const userId =
    typeof _userId === 'string' ? decodeURIComponent(_userId) : undefined;
  const win = typeof _win === 'string' ? _win : undefined;
  const rewardStatus =
    typeof _rewardStatus === 'string' ? _rewardStatus : undefined;

  const filters: ApplicantPageFilter = {
    page,
    pageSize,
    fromDate,
    toDate,
    adid,
    idfa,
    platform: platform as 'IOS' | 'ANDROID' | 'ETC' | undefined,
    clickKey,
    userId,
    win,
    rewardStatus: rewardStatus as 'SUCCESS' | 'FAILED' | 'NONE' | undefined,
  };

  return (
    <EventLayout>
      <EventLayout.Title>박스 찾기 응모자</EventLayout.Title>
      <EventLayout.Paper>
        <ApplicantPage eventType="FIND" eventId={eventId} {...filters} />
      </EventLayout.Paper>
    </EventLayout>
  );
};

export default page;
