import {Box, TableCell, TableRow} from '@mui/material';
import {FC} from 'react';
import ExcelDownloadButton, {
  ExcelDownloadButtonProps,
} from './ExcelDownloadButton';

interface Props {
  colSpan?: number;
  excelButtonProps?: ExcelDownloadButtonProps;
}

const TableActions: FC<Props> = ({colSpan, excelButtonProps}) => {
  if (!excelButtonProps) {
    return null;
  }

  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Box display="flex" justifyContent="flex-end">
          <ExcelDownloadButton {...excelButtonProps}>
            Excel 다운로드
          </ExcelDownloadButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableActions;
