import {
  Box,
  Typography,
  TypographyProps,
  Paper as MuiPaper,
  PaperProps,
  BoxProps,
  ButtonProps,
} from '@mui/material';
import {FC} from 'react';
import BackButton from '@/components/atoms/BackButton.client';

interface Props extends BoxProps {}

type DetailLayoutProps = FC<Props> & {
  Title: FC<TypographyProps>;
  Paper: FC<PaperProps>;
  BackButton: FC<ButtonProps>;
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

const DetailLayout: DetailLayoutProps = ({children, ...props}) => {
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

DetailLayout.Title = Title;
DetailLayout.Paper = Paper;
DetailLayout.BackButton = BackButton;

export default DetailLayout;
