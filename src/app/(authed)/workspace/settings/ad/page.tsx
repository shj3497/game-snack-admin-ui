import {AdManagePage} from '@/components/organisms/settings/ad-manage';

interface Props {
  searchParams: SearchParams;
}

const page = async (props: Props) => {
  const {
    page: _page,
    pageSize: _pageSize,
    name: _name,
    providerType: _providerType,
    adOrderType: _adOrderType,
  } = await props.searchParams;
  const page = typeof _page === 'string' ? +_page : 0;
  const pageSize = typeof _pageSize === 'string' ? +_pageSize : 10;
  const name =
    typeof _name === 'string' ? decodeURIComponent(_name) : undefined;
  const providerType =
    typeof _providerType === 'string' ? _providerType : undefined;
  const adOrderType =
    typeof _adOrderType === 'string' ? _adOrderType : undefined;

  return (
    <AdManagePage
      page={page}
      pageSize={pageSize}
      name={name}
      providerType={providerType}
      adOrderType={adOrderType}
    />
  );
};

export default page;
