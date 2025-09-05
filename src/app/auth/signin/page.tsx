import SignInPage from '@/components/organisms/auth/SignInPage.client';

interface Props {
  searchParams: SearchParams;
}

const page = async (props: Props) => {
  const {tokenExpired} = await props.searchParams;
  const tokenExpiredBool = tokenExpired === 'true';
  return <SignInPage tokenExpired={tokenExpiredBool} />;
};

export default page;
