import {Box, Button, Card, Stack, Typography} from '@mui/material';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import {FC} from 'react';
import AddIcon from '@mui/icons-material/AddOutlined';
import UserManageTable from '../user-manage/UserManageTable';
import {AppDetailFilter} from './AppDetailPage';
import Link from 'next/link';
import paths from '@/lib/utils/paths';

interface Props extends AppDetailFilter {
  appId: string;
}

const UserInfo: FC<Props> = ({appId, userInfoPage, userInfoPageSize}) => {
  return (
    <Card sx={{px: 3, py: 3, borderRadius: 2}} elevation={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" display="flex" alignItems="center" gap={1}>
          <Box component="span" display="flex">
            <PersonIcon />
          </Box>
          User Info
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          component={Link}
          href={paths.superspace.settings.app.user.create(appId)}
          scroll={false}
        >
          Add
        </Button>
      </Stack>
      <Box
        border={1}
        borderColor="divider"
        borderRadius={2}
        mt={3}
        overflow="hidden"
      >
        <UserManageTable
          page={userInfoPage}
          pageSize={userInfoPageSize}
          superspaceConfig={{appId, filterPrefix: 'user_info'}}
        />
      </Box>
    </Card>
  );
};

export default UserInfo;
