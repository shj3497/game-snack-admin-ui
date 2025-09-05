import {SettingLayout} from '@/components/organisms/settings';
import {AppDetailPage} from '@/components/organisms/settings/app-manage';
import paths from '@/lib/utils/paths';
import {Box, Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import {AppDetailFilter} from '@/components/organisms/settings/app-manage/AppDetailPage';

interface Props extends AppDetailFilter {
  params: Params;
  searchParams: SearchParams;
}

const page = async (props: Props) => {
  const {slug} = await props.params;
  const {user_info_page: _userInfoPage, user_info_pageSize: _userInfoPageSize} =
    await props.searchParams;
  const userInfoPage = typeof _userInfoPage === 'string' ? +_userInfoPage : 0;
  const userInfoPageSize =
    typeof _userInfoPageSize === 'string' ? +_userInfoPageSize : 5;

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

      <AppDetailPage
        appId={slug}
        userInfoPage={userInfoPage}
        userInfoPageSize={userInfoPageSize}
      />
    </SettingLayout>
  );
};

export default page;
