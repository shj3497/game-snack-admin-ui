import {SettingLayout} from '@/components/organisms/settings';
import {AllUserManagePage} from '@/components/organisms/settings/all-user-manage';
import {Box} from '@mui/material';
import Link from 'next/link';
import paths from '@/lib/utils/paths';
import {Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  searchParams: SearchParams;
}

const page = async (props: Props) => {
  const {page: _page, pageSize: _pageSize} = await props.searchParams;
  const page = typeof _page === 'string' ? +_page : 0;
  const pageSize = typeof _pageSize === 'string' ? +_pageSize : 10;

  return (
    <SettingLayout>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <SettingLayout.Title>사용자 관리</SettingLayout.Title>
        <Link href={paths.superspace.settings.user.create}>
          <Button variant="contained" startIcon={<AddIcon />}>
            사용자 추가
          </Button>
        </Link>
      </Box>

      <SettingLayout.Paper>
        <AllUserManagePage page={page} pageSize={pageSize} />
      </SettingLayout.Paper>
    </SettingLayout>
  );
};

export default page;
