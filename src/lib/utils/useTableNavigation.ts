'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import queryString from 'query-string';

const useTableNavigation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onPageChange = (page: number) => {
    const currentParams = queryString.parse(searchParams.toString());
    const newSearchParams = queryString.stringify({...currentParams, page});
    router.push(`${pathname}?${newSearchParams}`);
  };

  const onRowsPerPageChange = (pageSize: number) => {
    const currentParams = queryString.parse(searchParams.toString());
    const newSearchParams = queryString.stringify({
      ...currentParams,
      pageSize,
      page: 0,
    });
    router.push(`${pathname}?${newSearchParams}`);
  };

  return {
    onPageChange,
    onRowsPerPageChange,
  };
};

export default useTableNavigation;
