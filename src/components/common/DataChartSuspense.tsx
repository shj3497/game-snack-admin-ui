import {Skeleton, SkeletonProps} from '@mui/material';
import React, {FC, Suspense} from 'react';

interface Props extends SkeletonProps {
  children: React.ReactNode;
}

const DataChartSuspense: FC<Props> = ({children, ...props}) => {
  return (
    <Suspense
      fallback={
        <Skeleton variant="rectangular" width="100%" height={300} {...props} />
      }
    >
      {children}
    </Suspense>
  );
};

export default DataChartSuspense;
