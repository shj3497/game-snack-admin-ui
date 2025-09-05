import {NextPage} from 'next';

interface Props {
  params: Params;
  searchParams: SearchParams;
}

const page: NextPage<Props> = async (props) => {
  const {slug} = await props.params;
  console.log(slug);
  return <div>inquiry detail page</div>;
};

export default page;
