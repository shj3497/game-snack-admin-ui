import {SettingLayout} from '@/components/organisms/settings';
import {Box, Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {FC, ReactNode} from 'react';
import Link from 'next/link';
import paths from '@/lib/utils/paths';

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

const layout = ({children, modal}: Props) => {
  return (
    <SettingLayout>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <SettingLayout.Title>사용자 관리</SettingLayout.Title>
        <Link href={paths.workspace.settings.user.create}>
          <Button variant="contained" startIcon={<AddIcon />}>
            사용자 추가
          </Button>
        </Link>
      </Box>

      <SettingLayout.Paper>
        <>
          {children}
          {modal}
        </>
      </SettingLayout.Paper>
    </SettingLayout>
  );
};
export default layout;
