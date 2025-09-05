'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import queryString from 'query-string';

const useTableFilter = (prefix?: string) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const scroll = !prefix;

  const onPageChange = (page: number) => {
    const currentParams = queryString.parse(searchParams.toString());
    const newSearchParams = queryString.stringify({
      ...currentParams,
      [prefix ? `${prefix}_page` : 'page']: page,
    });
    router.push(`${pathname}?${newSearchParams}`, {scroll});
  };

  const onRowsPerPageChange = (pageSize: number) => {
    const currentParams = queryString.parse(searchParams.toString());
    const newSearchParams = queryString.stringify({
      ...currentParams,
      [prefix ? `${prefix}_pageSize` : 'pageSize']: pageSize,
      [prefix ? `${prefix}_page` : 'page']: 0,
    });
    router.push(`${pathname}?${newSearchParams}`, {scroll});
  };

  const onFromDateChange = (value: string) => {
    const currentParams = queryString.parse(searchParams.toString());
    const newSearchParams = queryString.stringify({
      ...currentParams,
      [prefix ? `${prefix}_fromDate` : 'fromDate']: value,
      [prefix ? `${prefix}_page` : 'page']: 0,
    });
    router.push(`${pathname}?${newSearchParams}`, {scroll});
  };

  const onToDateChange = (value: string) => {
    const currentParams = queryString.parse(searchParams.toString());
    const newSearchParams = queryString.stringify({
      ...currentParams,
      [prefix ? `${prefix}_toDate` : 'toDate']: value,
      [prefix ? `${prefix}_page` : 'page']: 0,
    });
    router.push(`${pathname}?${newSearchParams}`, {scroll});
  };

  const onFilterChange = (key: string, value: string) => {
    const currentParams = queryString.parse(searchParams.toString());
    if (value === '') {
      delete currentParams[key];
    } else {
      currentParams[key] = value;
    }

    const newSearchParams = queryString.stringify({
      ...currentParams,
      [prefix ? `${prefix}_page` : 'page']: 0,
    });

    router.push(`${pathname}?${newSearchParams}`, {scroll});
  };

  return {
    onPageChange,
    onRowsPerPageChange,
    onFromDateChange,
    onToDateChange,
    onFilterChange,
  };
};

export default useTableFilter;
