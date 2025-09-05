import {ReportCreateDrawer} from '@/components/organisms/settings/report-provider-manage';

interface Props {
  params: {
    slug: string;
  };
}

const page = async ({params}: Props) => {
  const appId = await params.slug;
  return <ReportCreateDrawer superspaceConfig={{appId}} />;
};

export default page;
