import {UserCreateDrawer} from '@/components/organisms/settings/user-manage';

interface Props {
  params: {
    slug: string;
  };
}

const page = async ({params}: Props) => {
  const appId = await params.slug;
  return <UserCreateDrawer superspaceConfig={{appId}} />;
};

export default page;
