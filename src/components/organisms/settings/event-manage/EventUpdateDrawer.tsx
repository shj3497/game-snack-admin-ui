import DrawerPage from '@/components/layout/DrawerPage.client';
import {FC, Suspense} from 'react';
import EventUpdateForm from './EventUpdateForm.client';
import paths from '@/lib/utils/paths';

interface Props {
  slug: string;
}

const EventUpdateDrawer: FC<Props> = async ({slug}) => {
  return (
    <Suspense>
      <DrawerPage
        title="이벤트 수정"
        path={paths.workspace.settings.event.detail(slug)}
      >
        <EventUpdateForm eventId={slug} />
      </DrawerPage>
    </Suspense>
  );
};
export default EventUpdateDrawer;
