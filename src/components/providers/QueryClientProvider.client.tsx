'use client';

import {QueryClientProvider as ReactQueryProvider} from '@tanstack/react-query';
import {FC} from 'react';
import {ReactQueryStreamedHydration} from '@tanstack/react-query-next-experimental';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {getQueryClient} from '@/lib/service/query-client';

interface Props {
  children: React.ReactNode;
}

const QueryClientProvider: FC<Props> = ({children}) => {
  const queryClient = getQueryClient();
  return (
    <ReactQueryProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryProvider>
  );
};

export default QueryClientProvider;
