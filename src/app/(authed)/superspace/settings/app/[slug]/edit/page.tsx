import {notFound} from 'next/navigation';
import AppUpdatePage from '@/components/organisms/settings/app-manage/AppUpdatePage';
import {SettingLayout} from '@/components/organisms/settings';
import {Box, Button} from '@mui/material';
import Link from 'next/link';
import paths from '@/lib/utils/paths';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
  params: {
    slug: string;
  };
}

const page = async (props: Props) => {
  const {slug} = await props.params;

  if (!slug) {
    return notFound();
  }

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
          href={paths.superspace.settings.app.detail(slug)}
          startIcon={<ArrowBackIcon />}
          color="inherit"
        >
          Back
        </Button>
      </Box>

      <AppUpdatePage appId={slug} />
    </SettingLayout>
  );
};

export default page;
