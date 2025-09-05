'use client';

import {Button, Menu, MenuItem, styled} from '@mui/material';
import {useState, MouseEvent, FC, useEffect} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {usePathname, useRouter} from 'next/navigation';
import useAppId, {AppInfo} from '@/lib/store/useAppId';
import paths from '@/lib/utils/paths';

interface Props {
  selectedAppId?: string;
  appList?: AppInfo[];
}

const StyledButton = styled(Button)`
  width: 150px;
  border-radius: 8px;
  position: relative;
  border: ${({theme}) => `1px solid ${theme.palette.grey[700]}`};

  .MuiButton-endIcon {
    position: absolute;
    right: 12px;
    color: ${({theme}) => theme.palette.grey[700]};
  }
`;

const CompanySelect: FC<Props> = ({appList = [], selectedAppId}) => {
  const pathname = usePathname();
  const isSuperspace = pathname.includes('superspace');

  const router = useRouter();

  const selectedAppInfo =
    appList.find((item) => item.value === selectedAppId) || appList[0];

  const {appInfo, setAppInfo, init} = useAppId();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (company: AppInfo) => {
    handleClose();
    setAppInfo(company);

    router.push(paths.workspace.main);
    router.refresh();
  };

  useEffect(() => {
    if (!selectedAppInfo) return;
    init({
      label: selectedAppInfo.label,
      value: selectedAppInfo.value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSuperspace) return null;

  return (
    <div style={{backgroundColor: '#fff'}}>
      <StyledButton
        variant="outlined"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        style={{justifyContent: 'flex-start'}}
      >
        {appInfo?.label || '선택'}
      </StyledButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{width: '150px'}}
        slotProps={{
          paper: {sx: {width: '150px', maxWidth: '100%'}},
        }}
      >
        {appList.map((item) => (
          <MenuItem
            key={item.value}
            selected={item.value === appInfo?.value}
            onClick={() => {
              handleSelect(item);
            }}
            sx={{borderRadius: 0, '&.Mui-selected': {color: 'primary.400'}}}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default CompanySelect;
