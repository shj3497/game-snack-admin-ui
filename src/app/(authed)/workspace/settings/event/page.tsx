import {EventManagePage} from '@/components/organisms/settings/event-manage';

interface Props {
  searchParams: SearchParams;
}

const page = async (props: Props) => {
  const {page: _page, pageSize: _pageSize} = await props.searchParams;
  const page = typeof _page === 'string' ? +_page : 0;
  const pageSize = typeof _pageSize === 'string' ? +_pageSize : 10;

  return <EventManagePage page={page} pageSize={pageSize} />;
};

export default page;
