import Header from '@/components/molecules/Header';
import Navigation from '@/components/molecules/Navigation';
import generateWorkspaceList from '@/components/molecules/Navigation/generate-workspace-list';
import {auth} from '@/lib/auth/auth';
import {Toolbar} from '@mui/material';
import Box from '@mui/material/Box';
import {FC, ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

const layout: FC<Props> = async ({children}) => {
  const session = await auth();
  const role = session?.user.role;

  const workspaceList = await generateWorkspaceList();

  const pages = workspaceList.filter((page) => {
    if (page.accessRole?.includes(role || 'MANAGER')) {
      return true;
    }
    return false;
  });

  return (
    <Box display="flex">
      <Navigation width="280px" pages={pages} />
      <Box component="main" width="100%" paddingLeft="280px">
        <Header sx={{paddingLeft: '280px'}} />
        <Toolbar />

        <Box px={3} py={6}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default layout;
