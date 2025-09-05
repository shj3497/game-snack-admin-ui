import {SettingLayout} from '@/components/organisms/settings';
import {AppCreatePage} from '@/components/organisms/settings/app-manage';
import {Box, Button} from '@mui/material';
import Link from 'next/link';
import paths from '@/lib/utils/paths';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {}

const page = async (props: Props) => {
  return (
    <SettingLayout>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Button
          component={Link}
          href={paths.superspace.settings.app.main}
          startIcon={<ArrowBackIcon />}
          color="inherit"
        >
          Back
        </Button>
      </Box>

      <AppCreatePage />
    </SettingLayout>
  );
};

export default page;
