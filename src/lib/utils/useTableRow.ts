'use client';

import {useState} from 'react';

const useTableRow = (defaultTableRowSize: number | undefined = 10) => {
  const [tableRowSize, setTableRowSize] = useState(defaultTableRowSize);

  const getFilteredData = <T>(rows: T[], currentPage: number) => {
    return rows.filter((_, index) => {
      const startIndex = currentPage * tableRowSize;
      const endIndex = (currentPage + 1) * tableRowSize;
      return index >= startIndex && index < endIndex;
    });
  };

  return {tableRowSize, setTableRowSize, getFilteredData};
};

export default useTableRow;
