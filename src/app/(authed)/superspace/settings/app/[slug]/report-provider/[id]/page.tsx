import {ReportUpdateDrawer} from '@/components/organisms/settings/report-provider-manage';
import {notFound} from 'next/navigation';

interface Props {
  params: {
    slug: string;
    id: string;
  };
}

const page = async ({params}: Props) => {
  const appId = await params.slug;
  const reportProviderId = await params.id;

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
