import DrawerPage from '@/components/layout/DrawerPage.client';
import paths from '@/lib/utils/paths';
import ReportCreateForm from './ReportCreateForm.client';
import {FC} from 'react';

interface Props {
  superspaceConfig?: {
    appId: string;
  };
}

const ReportCreateDrawer: FC<Props> = ({superspaceConfig}) => {
  const isSuperspace = !!superspaceConfig;
  const path = isSuperspace
    ? paths.superspace.settings.app.report_provider.create(
        superspaceConfig.appId,
      )
    : paths.workspace.settings.report_provider.create;

  return (
    <DrawerPage title="리포트 제공자 생성" path={path}>
      <ReportCreateForm />
    </DrawerPage>
  );
};

export default ReportCreateDrawer;
