import {UserUpdateDrawer} from '@/components/organisms/settings/user-manage';
import {NextPage} from 'next';

interface Props {
  params: Params;
}

const page: NextPage<Props> = async ({params}) => {
  const {slug} = await params;

  return <UserUpdateDrawer userId={slug} />;
};

export default page;
