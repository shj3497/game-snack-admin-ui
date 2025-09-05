import {Card, Stack, Typography, Box, Button} from '@mui/material';
import ReportManageTable from '../report-provider-manage/ReportManageTable';
import {FC} from 'react';
import AddIcon from '@mui/icons-material/AddOutlined';
import Link from 'next/link';
import paths from '@/lib/utils/paths';
import CableIcon from '@mui/icons-material/Cable';
import GenerateReportButton from '../report-provider-manage/GenerateReportButton.client';

interface Props {
  appId: string;
}
const ReportProviderInfo: FC<Props> = ({appId}) => {
  return (
    <Card sx={{px: 3, py: 3, borderRadius: 2}} elevation={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" display="flex" alignItems="center" gap={1}>
          <Box component="span" display="flex">
            <CableIcon />
          </Box>
          Report Provider Info
        </Typography>
        <Stack direction="row" spacing={1}>
          <GenerateReportButton appId={appId}>
            Generate Report
          </GenerateReportButton>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            size="small"
            component={Link}
            href={paths.superspace.settings.app.report_provider.create(appId)}
          >
            Add
          </Button>
        </Stack>
      </Stack>
      <Box
        border={1}
        borderColor="divider"
        borderRadius={2}
        mt={3}
        overflow="hidden"
      >
        <ReportManageTable superspaceConfig={{appId}} />
      </Box>
    </Card>
  );
};

export default ReportProviderInfo;
