import {FC, Suspense} from 'react';
import AppUpdateForm from './AppUpdateForm.client';

interface Props {
  appId: string;
}

const AppUpdatePage: FC<Props> = ({appId}) => {
  return (
    <Suspense>
      <AppUpdateForm appId={appId} />
    </Suspense>
  );
};

export default AppUpdatePage;
