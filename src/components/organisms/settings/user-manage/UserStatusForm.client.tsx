'use client';

import {FC, useState} from 'react';
import useAlert from '@/lib/utils/useAlert';
import useAppId from '@/lib/store/useAppId';
import {getQueryClient} from '@/lib/service/query-client';
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  StackProps,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import StatusChip from '@/components/atoms/StatusChip';
import {
  getAdminAuthGetUserQueryKey,
  getAdminAuthListQueryKey,
  useAdminAuthResetPassword,
  useAdminAuthUpdateUserStatus,
} from '@/lib/service/api-client/admin-auth/admin-auth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface Props extends StackProps {
  userId: string;
  enabled: boolean;
}

const UserStatusForm: FC<Props> = ({userId, enabled, ...props}) => {
  const {showAlert} = useAlert();
  const appId = useAppId((store) => store.appId);

  const queryClient = getQueryClient();

  const {mutate: updateUserStatus, isPending: isUpdateUserStatusPending} =
    useAdminAuthUpdateUserStatus({
      mutation: {
        onSuccess: () => {
          showAlert({
            variant: 'success',
            message: '사용자 상태가 업데이트되었습니다.',
          });
          queryClient.invalidateQueries({
            queryKey: getAdminAuthListQueryKey(appId),
          });
          queryClient.invalidateQueries({
            queryKey: getAdminAuthGetUserQueryKey(appId, userId),
          });
        },
        onError: (error: any) => {
          const message =
            error.detail?.message || '사용자 상태 업데이트에 실패하였습니다.';

          showAlert({
            variant: 'error',
            message,
          });
        },
      },
    });

  const handleUpdateUserStatus = () => {
    updateUserStatus({appId, userId, data: {enabled: !enabled}});
  };

  return (
    <Stack {...props}>
      <Card sx={{p: 2}}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2">사용자 상태</Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={enabled}
                  onChange={handleUpdateUserStatus}
                  disabled={isUpdateUserStatusPending}
                />
              }
              label={<StatusChip status={enabled ? 'enabled' : 'disabled'} />}
              labelPlacement="start"
            />
          </Stack>
          <ResetPasswordForm userId={userId} />
        </Stack>
      </Card>
    </Stack>
  );
};

interface ResetPasswordFormProps {
  userId: string;
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({userId}) => {
  const appId = useAppId((store) => store.appId);
  const {showAlert} = useAlert();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [inputType, setInputType] = useState<'password' | 'text'>('password');

  const isPasswordType = inputType === 'password';

  const {mutate, isPending} = useAdminAuthResetPassword({
    mutation: {
      onSuccess: () => {
        handleClose();
        setPassword('');
        showAlert({
          variant: 'success',
          message: '사용자 비밀번호가 초기화되었습니다.',
        });
      },
      onError: () => {
        showAlert({
          variant: 'error',
          message: '사용자 비밀번호 초기화에 실패하였습니다.',
        });
      },
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    mutate({appId, userId, data: {temporaryPassword: password}});
  };

  return (
    <Stack>
      <Button
        size="small"
        variant="outlined"
        color="error"
        onClick={handleOpen}
      >
        Reset Password
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              width: '400px',
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            paddingBottom: 0,
          }}
        >
          Reset Password
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} pt={2}>
            <TextField
              size="small"
              label="temporary password"
              fullWidth
              type={inputType}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      size="small"
                      onClick={() =>
                        setInputType(isPasswordType ? 'text' : 'password')
                      }
                    >
                      {isPasswordType ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  ),
                },
              }}
            />
            <Stack direction="row" justifyContent="flex-end">
              <Button
                size="small"
                variant="contained"
                color="primary"
                loading={isPending}
                onClick={handleSubmit}
              >
                Reset Password
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default UserStatusForm;
