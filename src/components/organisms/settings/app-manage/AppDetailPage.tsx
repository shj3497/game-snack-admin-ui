import {Stack} from '@mui/material';
import {FC} from 'react';
import AppInfo from './AppInfo';
import ReportProviderInfo from './ReportProviderInfo';
import UserInfo from './UserInfo';

interface Props extends AppDetailFilter {
  appId: string;
}

export type AppDetailFilter = {
  userInfoPage?: number;
  userInfoPageSize?: number;
};

const AppDetailPage: FC<Props> = ({appId, userInfoPage, userInfoPageSize}) => {
  return (
    <Stack spacing={4}>
      <AppInfo appId={appId} />
      <UserInfo
        appId={appId}
        userInfoPage={userInfoPage}
        userInfoPageSize={userInfoPageSize}
      />
      <ReportProviderInfo appId={appId} />
    </Stack>
  );
};
export default AppDetailPage;
