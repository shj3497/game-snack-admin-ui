import {SettingLayout} from '@/components/organisms/settings';
import paths from '@/lib/utils/paths';
import {Box, Button} from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {UserCreatePage} from '@/components/organisms/settings/all-user-manage';

const page = () => {
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
          href={paths.superspace.settings.user.main}
          startIcon={<ArrowBackIcon />}
          color="inherit"
        >
          Back
        </Button>
      </Box>

      <UserCreatePage />
    </SettingLayout>
  );
};

export default page;
