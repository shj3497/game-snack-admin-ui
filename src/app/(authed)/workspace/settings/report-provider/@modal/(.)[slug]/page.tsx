import {ReportUpdateDrawer} from '@/components/organisms/settings/report-provider-manage';

interface Props {
  params: Params;
}

const page = async (props: Props) => {
  const {slug} = await props.params;
  return <ReportUpdateDrawer slug={slug} />;
};

export default page;
