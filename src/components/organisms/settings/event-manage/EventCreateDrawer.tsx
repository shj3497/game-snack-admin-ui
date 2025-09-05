import paths from '@/lib/utils/paths';
import {FC} from 'react';
import DrawerPage from '@/components/layout/DrawerPage.client';
import EventCreateForm from './EventCreateForm.client';

interface Props {}

const EventCreateDrawer: FC<Props> = ({...props}) => {
  return (
    <DrawerPage
      title="이벤트 생성"
      path={paths.workspace.settings.event.create}
    >
      <EventCreateForm />
    </DrawerPage>
  );
};

export default EventCreateDrawer;
