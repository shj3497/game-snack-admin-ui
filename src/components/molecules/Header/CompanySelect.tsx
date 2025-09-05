import {getAppListByUser} from '@/lib/service/api-server/apps/apps';
import CompanySelectView from './CompanySelectView.client';
import {getCookie} from 'cookies-next';
import {cookies} from 'next/headers';

const CompanySelect = async () => {
  try {
    const {data} = await getAppListByUser();
    let appId = await getCookie('appId', {cookies});
    const appList = data.map((app) => ({
      label: app.appName,
      value: app.appId || '',
    }));
    if (!appId) {
      appId = appList[0].value;
    }

    return <CompanySelectView appList={appList} selectedAppId={appId} />;
  } catch (error) {
    console.log(error);
    return <CompanySelectView />;
  }
};

export default CompanySelect;
