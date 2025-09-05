import {
  Skeleton,
  SkeletonProps,
  TableBody,
  TableBodyProps,
  TableCell,
  TableRow,
} from '@mui/material';
import React, {FC} from 'react';

export interface TableBodySkeletonProps {
  rowNum?: number;
  colNum?: number;
  tableBodyProps?: TableBodyProps;
  skeletonProps?: SkeletonProps;
}

const TableBodySkeleton: FC<TableBodySkeletonProps> = ({
  rowNum = 1,
  colNum = 1,
  tableBodyProps,
  skeletonProps,
}) => {
  return (
    <TableBody {...tableBodyProps}>
      {new Array(rowNum).fill(1).map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {new Array(colNum).fill(1).map((col, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton {...skeletonProps} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodySkeleton;
