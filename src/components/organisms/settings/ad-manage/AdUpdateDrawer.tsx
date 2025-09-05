import DrawerPage from '@/components/layout/DrawerPage.client';
import paths from '@/lib/utils/paths';
import {FC, Suspense} from 'react';
import AdUpdateForm from './AdUpdateForm.client';

interface Props {
  slug: string;
}

const AdUpdateDrawer: FC<Props> = ({slug}) => {
  return (
    <Suspense>
      <DrawerPage
        title="광고 지면 수정"
        path={paths.workspace.settings.ad.detail(slug)}
      >
        <AdUpdateForm adId={slug} />
      </DrawerPage>
    </Suspense>
  );
};

export default AdUpdateDrawer;
