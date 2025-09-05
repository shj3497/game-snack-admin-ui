import {AdUpdateDrawer} from '@/components/organisms/settings/ad-manage';

interface Props {
  params: Params;
}

const page = async (props: Props) => {
  const {slug} = await props.params;
  return <AdUpdateDrawer slug={slug} />;
};

export default page;
