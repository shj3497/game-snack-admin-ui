import {ReportPage} from '@/components/organisms/reports';

interface Props {
  searchParams: SearchParams;
}

const page = async (props: Props) => {
  const {
    page: _page,
    pageSize: _pageSize,
    fromDate: _fromDate,
    toDate: _toDate,
    providerType: _providerType,
    placementName: _placementName,
  } = await props.searchParams;

  const page = typeof _page === 'string' ? +_page : 0;
  const pageSize = typeof _pageSize === 'string' ? +_pageSize : 10;

  const fromDate = typeof _fromDate === 'string' ? _fromDate : undefined;
  const toDate = typeof _toDate === 'string' ? _toDate : undefined;

  const providerType = typeof _providerType === 'string' ? _providerType : '';

  const placementName =
    typeof _placementName === 'string'
      ? decodeURIComponent(_placementName)
      : undefined;

  return (
    <ReportPage
      page={page}
      pageSize={pageSize}
      fromDate={fromDate}
      toDate={toDate}
      providerType={providerType}
      placementName={placementName}
    />
  );
};

export default page;
