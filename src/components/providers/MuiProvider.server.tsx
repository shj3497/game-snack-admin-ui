import {theme} from '@/lib/theme';
import {CssBaseline} from '@mui/material';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import {ThemeProvider} from '@mui/material/styles';
import {ReactNode} from 'react';

const MuiProvider = ({children}: {children: ReactNode}) => {
  return (
    <AppRouterCacheProvider options={{enableCssLayer: true}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default MuiProvider;
