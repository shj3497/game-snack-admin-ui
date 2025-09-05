import React from 'react';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import Button, {ButtonProps} from '@mui/material/Button';

export interface ExcelDownloadButtonProps extends ButtonProps {
  /** 엑셀로 변환할 데이터 배열 */
  data: object[];
  /** 다운로드될 파일 이름 */
  fileName?: string;
  /** 생성될 시트 이름 */
  sheetName?: string;
}

/**
 * 데이터를 엑셀 파일로 다운로드하는 버튼 컴포넌트
 * @param data - 엑셀로 변환할 데이터 배열 (필수)
 * @param fileName - 다운로드될 파일 이름
 * @param sheetName - 생성될 시트 이름
 * @param props - MUI Button의 모든 props
 */
const ExcelDownloadButton: React.FC<ExcelDownloadButtonProps> = ({
  data,
  fileName = 'download.xlsx',
  sheetName = 'Sheet1',
  children = '엑셀 다운로드',
  disabled,
  ...props
}) => {
  const handleDownload = () => {
    if (!data || data.length === 0) {
      alert('다운로드할 데이터가 없습니다.');
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, fileName);
  };

  return (
    <Button
      variant="outlined"
      size="small"
      onClick={handleDownload}
      color="secondary"
      disabled={disabled || !data || data.length === 0}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ExcelDownloadButton;
