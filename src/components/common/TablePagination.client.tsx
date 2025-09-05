'use client';

import {ChangeEvent, FC} from 'react';
import {
  Skeleton,
  TablePagination as MuiTablePagination,
  TableRow,
  TableCell,
} from '@mui/material';
import useTableFilter from '@/lib/utils/useTableFilter';

interface Props {
  count: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;
  onRowsPerPageChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  isLoading?: boolean;
  colSpan?: number;
  prefix?: string;
}
const TablePagination: FC<Props> = ({
  count,
  page,
  rowsPerPage,
  rowsPerPageOptions = [1, 5, 10, 20, 100],
  onPageChange,
  onRowsPerPageChange,
  isLoading,
  colSpan = 1,
  prefix,
}) => {
  const {onPageChange: pageChange, onRowsPerPageChange: rowPerPageChange} =
    useTableFilter(prefix);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => {
    if (onPageChange) {
      return onPageChange(event, page);
    }
    pageChange(page);
  };

  const handleRowsPerPageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (onRowsPerPageChange) {
      return onRowsPerPageChange(event);
    }
    rowPerPageChange(Number(event.target.value));
  };

  if (isLoading) {
    return <Skeleton variant="rectangular" sx={{height: '52px'}} />;
  }

  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <MuiTablePagination
          component="div"
          count={count}
          onPageChange={handlePageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onRowsPerPageChange={handleRowsPerPageChange}
          slotProps={{
            menuItem: {
              sx: {
                borderRadius: 0,
              },
            },
          }}
        />
      </TableCell>
    </TableRow>
  );
};
export default TablePagination;
