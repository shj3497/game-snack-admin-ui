import {UserUpdateDrawer} from '@/components/organisms/settings/user-manage';

interface Props {
  params: {
    slug: string;
    id: string;
  };
}

const page = async ({params}: Props) => {
  const appId = await params.slug;
  const userId = await params.id;
  return <UserUpdateDrawer userId={userId} superspaceConfig={{appId}} />;
};

export default page;
