import {ReportUpdateDrawer} from '@/components/organisms/settings/report-provider-manage';
import {notFound} from 'next/navigation';
import {FC} from 'react';

interface Props {
  params: {
    slug: string;
    id: string;
  };
}

const page: FC<Props> = ({params}) => {
  const appId = params.slug;
  const reportProviderId = params.id;

  if (!appId || !reportProviderId) {
    return notFound();
  }

  return (
    <ReportUpdateDrawer
      superspaceConfig={{
        appId,
      }}
      slug={reportProviderId}
    />
  );
};

export default page;
