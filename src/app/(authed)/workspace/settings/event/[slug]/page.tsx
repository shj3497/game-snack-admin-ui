import {EventUpdateDrawer} from '@/components/organisms/settings/event-manage';

interface Props {
  params: Params;
}

const page = async (props: Props) => {
  const {slug} = await props.params;

  return <EventUpdateDrawer slug={slug} />;
};

export default page;
