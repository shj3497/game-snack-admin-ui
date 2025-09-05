import DrawerPage from '@/components/layout/DrawerPage.client';
import {FC, Suspense} from 'react';
import ReportUpdateForm from './ReportUpdateForm.client';
import paths from '@/lib/utils/paths';

interface Props {
  slug: string;
  superspaceConfig?: {
    appId: string;
  };
}

const ReportUpdateDrawer: FC<Props> = ({slug, superspaceConfig}) => {
  const isSuperspace = !!superspaceConfig;
  const path = isSuperspace
    ? paths.superspace.settings.app.report_provider.detail(
        superspaceConfig.appId,
        slug,
      )
    : paths.workspace.settings.report_provider.detail(slug);

  return (
    <Suspense>
      <DrawerPage title="리포트 제공자 수정" path={path}>
        <ReportUpdateForm reportProviderId={slug} />
      </DrawerPage>
    </Suspense>
  );
};

export default ReportUpdateDrawer;
