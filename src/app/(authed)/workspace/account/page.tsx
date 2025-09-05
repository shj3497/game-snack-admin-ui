import {AccountPage} from '@/components/organisms/account';

interface Props {
  searchParams: SearchParams;
}

const page = async (props: Props) => {
  const {isTemporaryPassword} = await props.searchParams;
  const isTemporaryPasswordBool = isTemporaryPassword === 'true';
  return <AccountPage isTemporaryPassword={isTemporaryPasswordBool} />;
};

export default page;
