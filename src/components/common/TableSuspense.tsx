import React, {FC, Suspense} from 'react';
import TableBodySkeleton, {TableBodySkeletonProps} from './TableBodySkeleton';

interface Props extends TableBodySkeletonProps {
  children: React.ReactNode;
}

const TableSuspense: FC<Props> = ({children, ...props}) => {
  return (
    <Suspense fallback={<TableBodySkeleton {...props} />}>{children}</Suspense>
  );
};

export default TableSuspense;
