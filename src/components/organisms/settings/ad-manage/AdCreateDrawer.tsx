import DrawerPage from '@/components/layout/DrawerPage.client';
import paths from '@/lib/utils/paths';
import AdCreateForm from './AdCreateForm.client';

const AdCreateDrawer = () => {
  return (
    <DrawerPage
      title="광고 지면 생성"
      path={paths.workspace.settings.ad.create}
    >
      <AdCreateForm />
    </DrawerPage>
  );
};
export default AdCreateDrawer;
