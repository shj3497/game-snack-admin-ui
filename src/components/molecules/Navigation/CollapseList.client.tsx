'use client';

import {Box, Collapse, List, ListItem, ListItemIcon} from '@mui/material';
import {FC, ReactNode, useEffect, useState} from 'react';
import NavigationButton from './NavigationButton';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {ChildPage} from './type';

interface Props {
  data: ChildPage;
}

const CollapseList: FC<Props> = ({data}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(pathname === data.url);
  const handleClick = () => {
    setOpen((open) => !open);
  };

  const getIcon = (
    selected: boolean,
    icon?: ReactNode,
    selectedIcon?: ReactNode,
  ) => {
    if (selected && selectedIcon) {
      return selectedIcon;
    }
    return icon ?? null;
  };

  useEffect(() => {
    if (!pathname.includes(data.url || '')) {
      setOpen(false);
    }
  }, [data.url, pathname]);

  if (!data.childPages) {
    return (
      <ListItem>
        <NavigationButton
          component={Link}
          href={data.url || ''}
          selected={pathname.includes(data.mainPath ?? (data.url || ''))}
        >
          <Box component="span" sx={{display: 'flex', alignItems: 'center'}}>
            {data.icon && (
              <ListItemIcon sx={{mr: '8px'}}>
                {getIcon(
                  pathname.includes(data.mainPath ?? (data.url || '')),
                  data.icon,
                  data.selectedIcon,
                )}
              </ListItemIcon>
            )}
            {data.name}
          </Box>
        </NavigationButton>
      </ListItem>
    );
  }

  return (
    <>
      <ListItem onClick={handleClick}>
        <NavigationButton
          selected={pathname.includes(data.mainPath ?? (data.url || ''))}
        >
          <Box component="span" sx={{display: 'flex', alignItems: 'center'}}>
            {data.icon && (
              <ListItemIcon sx={{mr: '8px'}}>
                {getIcon(
                  pathname.includes(data.mainPath ?? (data.url || '')),
                  data.icon,
                  data.selectedIcon,
                )}
              </ListItemIcon>
            )}
            {data.name}
          </Box>
          <ListItemIcon>
            {!open ? <ChevronRightIcon /> : <ExpandMoreIcon />}
          </ListItemIcon>
        </NavigationButton>
      </ListItem>
      <Collapse in={open}>
        <List sx={{py: 0, paddingLeft: 2}}>
          {data.childPages.map((item) => (
            <ListItem key={item.id || item.name}>
              <NavigationButton
                component={Link}
                href={item.url}
                // selected={pathname === (data.mainPath ?? (data.url || ''))}
                selected={pathname === item.url}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'transparent',
                    color: 'primary.400',
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'primary.400',
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{display: 'flex', alignItems: 'center'}}
                >
                  {item.icon && (
                    <ListItemIcon sx={{mr: '8px'}}>
                      {getIcon(
                        pathname === item.url,
                        item.icon,
                        item.selectedIcon,
                      )}
                    </ListItemIcon>
                  )}
                  {item.name}
                </Box>
              </NavigationButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};
export default CollapseList;
