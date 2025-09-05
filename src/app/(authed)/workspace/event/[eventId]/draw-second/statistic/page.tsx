import EventLayout from '@/components/organisms/event/EventLayout';
import StatisticPage from '@/components/organisms/event/StatisticPage';

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
  } = await props.searchParams;
  const {eventId} = await props.params;

  const page = typeof _page === 'string' ? +_page : 0;
  const pageSize = typeof _pageSize === 'string' ? +_pageSize : 10;
  const fromDate = typeof _fromDate === 'string' ? _fromDate : undefined;
  const toDate = typeof _toDate === 'string' ? _toDate : undefined;

  return (
    <EventLayout>
      <EventLayout.Title>도형 그리기 통계</EventLayout.Title>

      <EventLayout.Paper>
        <StatisticPage
          eventType="DRAW"
          eventId={eventId}
          page={page}
          pageSize={pageSize}
          fromDate={fromDate}
          toDate={toDate}
        />
      </EventLayout.Paper>
    </EventLayout>
  );
};

export default page;
