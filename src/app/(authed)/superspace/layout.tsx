import Header from '@/components/molecules/Header';
import Navigation from '@/components/molecules/Navigation';
import superspaceList from '@/components/molecules/Navigation/superspace-list';
import {Box, Toolbar} from '@mui/material';

interface Props {
  children: React.ReactNode;
}
const layout = ({children}: Props) => {
  return (
    <Box display="flex">
      <Navigation width="280px" pages={superspaceList} />
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
