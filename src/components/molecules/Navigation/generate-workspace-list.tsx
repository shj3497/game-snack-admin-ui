import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddOutlined from '@mui/icons-material/PersonAddOutlined';
import GameIcon from '@mui/icons-material/Gamepad';
import GameOutlinedIcon from '@mui/icons-material/GamepadOutlined';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import DollarOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import DollarIcon from '@mui/icons-material/AttachMoney';
import CableIcon from '@mui/icons-material/Cable';
import CableOutlinedIcon from '@mui/icons-material/CableOutlined';
import paths from '@/lib/utils/paths';
import {getCookie} from 'cookies-next';
import {cookies} from 'next/headers';
import {getEventList} from '@/lib/service/api-server/events/events';
import {PageListItem} from './type';

const eventPages = (eventId: string) => [
  {
    name: '시간 잡기',
    eventType: 'CATCH',
    url: paths.workspace.event(eventId).catch_second.main,
    icon: <GameOutlinedIcon />,
    selectedIcon: <GameIcon />,
    childPages: [
      {
        name: '응모자',
        url: paths.workspace.event(eventId).catch_second.main,
      },
      {
        name: '통계',
        url: paths.workspace.event(eventId).catch_second.statistic,
      },
    ],
  },
  {
    name: '도형 그리기',
    eventType: 'DRAW',
    url: paths.workspace.event(eventId).draw_second.main,
    icon: <GameOutlinedIcon />,
    selectedIcon: <GameIcon />,
    childPages: [
      {name: '응모자', url: paths.workspace.event(eventId).draw_second.main},
      {name: '통계', url: paths.workspace.event(eventId).draw_second.statistic},
    ],
  },
  {
    name: '박스 찾기',
    eventType: 'FIND',
    url: paths.workspace.event(eventId).find_second.main,
    icon: <GameOutlinedIcon />,
    selectedIcon: <GameIcon />,
    childPages: [
      {name: '응모자', url: paths.workspace.event(eventId).find_second.main},
      {name: '통계', url: paths.workspace.event(eventId).find_second.statistic},
    ],
  },
  {
    name: '룰렛 돌리기',
    eventType: 'ROULETTE',
    url: paths.workspace.event(eventId).roulette.main,
    icon: <GameOutlinedIcon />,
    selectedIcon: <GameIcon />,
    childPages: [
      {name: '응모자', url: paths.workspace.event(eventId).roulette.main},
      {name: '통계', url: paths.workspace.event(eventId).roulette.statistic},
    ],
  },
  // {
  //   name: '가위바위보',
  //   url: paths.workspace.event.rps_roulette.main,
  //   icon: <GameOutlinedIcon />,
  //   selectedIcon: <GameIcon />,
  //   childPages: [
  //     {name: '응모자', url: paths.workspace.event.rps_roulette.main},
  //     {name: '통계', url: paths.workspace.event.rps_roulette.statistic},
  //   ],
  // },
];

export const workspaceList: PageListItem[] = [
  // {subHeader: '사용자 현황', childPages: []},
  {
    subHeader: '매출관리',
    accessRole: ['SUPER_ADMIN', 'ADMIN', 'MANAGER'],
    childPages: [
      {
        name: '광고 매출 현황',
        url: paths.workspace.report.main,
        icon: <DollarOutlinedIcon />,
        selectedIcon: <DollarIcon />,
      },
    ],
  },
  {
    subHeader: '이벤트',
    accessRole: ['SUPER_ADMIN', 'ADMIN', 'MANAGER'],
    childPages: [],
  },
  {
    subHeader: '설정',
    accessRole: ['SUPER_ADMIN', 'ADMIN'],
    childPages: [
      {
        name: '사용자 관리',
        url: paths.workspace.settings.user.main,
        // mainPath: paths.workspace.settings.user.main,
        icon: <PersonAddOutlined />,
        selectedIcon: <PersonAddIcon />,
      },
      {
        name: '이벤트 관리',
        url: paths.workspace.settings.event.main,
        mainPath: paths.workspace.settings.event.main,
        icon: <GameOutlinedIcon />,
        selectedIcon: <GameIcon />,
      },
      {
        name: '광고 지면 관리',
        url: paths.workspace.settings.ad.main,
        mainPath: paths.workspace.settings.ad.main,
        icon: <SmartDisplayOutlinedIcon />,
        selectedIcon: <SmartDisplayIcon />,
      },
      {
        name: '리포트 제공자 관리',
        url: paths.workspace.settings.report_provider.main,
        mainPath: paths.workspace.settings.report_provider.main,
        icon: <CableOutlinedIcon />,
        selectedIcon: <CableIcon />,
      },
    ],
  },
];

const generateWorkspaceList = async () => {
  const appId = await getCookie('appId', {cookies});
  try {
    const eventList = await getEventList(
      appId || '',
      {},
      {next: {tags: ['event-list']}},
    );

    const savedEventInfoList = eventList.data.content?.map((item) => ({
      eventType: item.eventType,
      eventMenuName: item.adminMenuName,
      id: item.id,
    }));

    const newEventPages = savedEventInfoList?.map((item) => {
      return {
        ...eventPages(item.id).find(
          (savedItem) => savedItem.eventType === item.eventType,
        ),
        name: item.eventMenuName,
        id: item.id,
      };
    });

    const result = workspaceList.map((item) => {
      if (item.subHeader === '이벤트') {
        return {
          ...item,
          childPages: newEventPages,
        };
      }
      return item;
    });
    return result;
  } catch (error) {
    console.error(error);
    return workspaceList;
  }
};

export default generateWorkspaceList;
