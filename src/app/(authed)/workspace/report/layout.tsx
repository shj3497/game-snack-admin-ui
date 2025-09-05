import ReportLayout from '@/components/organisms/reports/ReportLayout';
import Box from '@mui/material/Box';
import {FC} from 'react';

interface Props {
  children: React.ReactNode;
}
const layout: FC<Props> = ({children}) => {
  return (
    <ReportLayout>
      <Box mb={4}>
        <ReportLayout.Title>광고 매출 현황</ReportLayout.Title>
      </Box>
      <ReportLayout.Paper>{children}</ReportLayout.Paper>
    </ReportLayout>
  );
};

export default layout;
