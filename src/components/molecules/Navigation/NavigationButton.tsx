import {ListItemButton, ListItemButtonProps} from '@mui/material';
import {FC} from 'react';

interface Props extends ListItemButtonProps {
  href?: string;
}

const NavigationButton: FC<Props> = ({sx, ...props}) => {
  return (
    <ListItemButton
      {...props}
      sx={{
        justifyContent: 'space-between',
        '&.Mui-selected': {
          color: 'primary.400',
          fontWeight: 500,
          '.MuiSvgIcon-root': {
            color: 'primary.400',
          },
        },
        ...sx,
      }}
    />
  );
};
export default NavigationButton;
