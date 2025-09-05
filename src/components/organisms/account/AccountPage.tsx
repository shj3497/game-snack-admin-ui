import {Box, CircularProgress, Stack, Typography} from '@mui/material';
import MyInfoUpdateForm from './MyInfoUpdateForm.client';
import {FC, Suspense} from 'react';

interface Props {
  isTemporaryPassword?: boolean;
}

const AccountPage: FC<Props> = ({isTemporaryPassword}) => {
  return (
    <Stack width="100%">
      <Box px={3} py={4}>
        <Stack mb={5} spacing={2}>
          <Typography variant="h5">My Info Update</Typography>
          {isTemporaryPassword && (
            <Typography color="warning">
              임시 비밀번호로 로그인하셨습니다. 비밀번호를 변경해주세요.
            </Typography>
          )}
        </Stack>
        <Suspense
          fallback={
            <Stack justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Stack>
          }
        >
          <MyInfoUpdateForm isTemporaryPassword={isTemporaryPassword} />
        </Suspense>
      </Box>
    </Stack>
  );
};

export default AccountPage;
