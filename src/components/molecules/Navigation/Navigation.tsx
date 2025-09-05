import {
  Box,
  BoxProps,
  List,
  ListSubheader,
  Stack,
  Toolbar,
} from '@mui/material';
import {FC, Fragment} from 'react';
import Link from 'next/link';
import CollapseList from './CollapseList.client';
import {PageListItem} from './type';
import {auth} from '@/lib/auth/auth';

interface Props extends BoxProps {
  pages?: PageListItem[];
}

const Navigation: FC<Props> = async ({sx, pages = [], ...props}) => {
  const session = await auth();
  const role = session?.user.role;
  const isSuperAdmin = role === 'SUPER_ADMIN';
  // const logoLink = isSuperAdmin ? '/' : '/workspace';
  const logoLink = '/workspace';

  return (
    <Box
      {...props}
      sx={{
        height: '100vh',
        position: 'fixed',
        zIndex: 1200,
        ...sx,
      }}
    >
      <Toolbar>
        <Link href={logoLink} style={{display: 'flex'}}>
          <img src="/FINFLOW.svg" alt="finflow" height="20px" />
        </Link>
      </Toolbar>
      <Stack
        sx={{
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          paddingBottom: '64px',
        }}
      >
        <List sx={{minHeight: 'fit-content'}}>
          {pages.map((page) => (
            <Fragment key={page.subHeader}>
              <ListSubheader sx={{position: 'static'}}>
                {page.subHeader}
              </ListSubheader>
              {page.childPages?.map((childPage) => (
                <CollapseList
                  key={childPage.id || childPage.name}
                  data={childPage}
                />
              ))}
            </Fragment>
          ))}
        </List>
      </Stack>
    </Box>
  );
};

export default Navigation;
