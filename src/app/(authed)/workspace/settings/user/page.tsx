import {UserManagePage} from '@/components/organisms/settings/user-manage';
import {prefetchAdminAuthList} from '@/lib/service/api-server/admin-auth/admin-auth';
import {getQueryClient} from '@/lib/service/query-client';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import {cookies} from 'next/headers';

interface Props {
  searchParams: SearchParams;
}

const page = async (props: Props) => {
  const {page: _page, pageSize: _pageSize} = await props.searchParams;

  const page = typeof _page === 'string' ? +_page : 0;
  const pageSize = typeof _pageSize === 'string' ? +_pageSize : 10;

  const appId = (await getCookie('appId', {cookies})) || '';

  const queryClient = getQueryClient();
  void prefetchAdminAuthList(queryClient, appId, {page, size: pageSize});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserManagePage />
    </HydrationBoundary>
  );
};

export default page;
