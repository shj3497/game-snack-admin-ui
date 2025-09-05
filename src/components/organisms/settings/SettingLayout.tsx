import {
  Box,
  BoxProps,
  Paper as MuiPaper,
  PaperProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import {FC} from 'react';

interface Props extends BoxProps {}

type SettingLayoutProps = FC<Props> & {
  Title: FC<TypographyProps>;
  Paper: FC<PaperProps>;
};

const Title: FC<TypographyProps> = ({sx, ...props}) => (
  <Typography sx={{fontSize: '2rem', fontWeight: 500, ...sx}} {...props} />
);

const Paper: FC<PaperProps> = ({children, sx, ...props}) => (
  <MuiPaper
    elevation={2}
    sx={{borderRadius: '16px', overflow: 'hidden', ...sx}}
    {...props}
  >
    <Box>{children}</Box>
  </MuiPaper>
);

const SettingLayout: SettingLayoutProps = ({children, ...props}) => {
  return (
    <Box
      {...props}
      sx={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 24px',
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
};

SettingLayout.Title = Title;
SettingLayout.Paper = Paper;

export default SettingLayout;
