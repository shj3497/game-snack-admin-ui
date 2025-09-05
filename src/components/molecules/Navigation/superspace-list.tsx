import paths from '@/lib/utils/paths';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddOutlined from '@mui/icons-material/PersonAddOutlined';
import MemoryIcon from '@mui/icons-material/Memory';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import {PageListItem} from './type';

const superspaceList: PageListItem[] = [
  {subHeader: '매출관리', childPages: []},
  {
    subHeader: '설정',
    childPages: [
      {
        name: '앱 관리',
        url: paths.superspace.settings.app.main,
        icon: <MemoryOutlinedIcon />,
        selectedIcon: <MemoryIcon />,
      },
      {
        name: '사용자 관리',
        url: paths.superspace.settings.user.main,
        icon: <PersonAddOutlined />,
        selectedIcon: <PersonAddIcon />,
      },
    ],
  },
];

export default superspaceList;
