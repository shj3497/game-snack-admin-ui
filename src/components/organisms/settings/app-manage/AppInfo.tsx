import {
  Box,
  Card,
  Stack,
  Table,
  TableContainer,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import {FC, Suspense} from 'react';
import EditIcon from '@mui/icons-material/EditOutlined';
import Link from 'next/link';
import paths from '@/lib/utils/paths';
import AppInfoView, {AppInfoViewSkeleton} from './AppInfoView.client';
import MemoryIcon from '@mui/icons-material/Memory';

interface Props {
  appId: string;
}

const AppInfo: FC<Props> = ({appId}) => {
  return (
    <Card sx={{px: 3, py: 3, borderRadius: 2}} elevation={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" display="flex" alignItems="center" gap={1}>
          <Box component="span" display="flex">
            <MemoryIcon />
          </Box>
          App Info
        </Typography>
        <Tooltip title="edit">
          <IconButton
            component={Link}
            href={paths.superspace.settings.app.edit(appId)}
            size="small"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Box
        border={1}
        borderColor="divider"
        borderRadius={2}
        mt={3}
        overflow="hidden"
      >
        <TableContainer>
          <Table>
            <Suspense fallback={<AppInfoViewSkeleton />}>
              <AppInfoView appId={appId} />
            </Suspense>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
};

export default AppInfo;
