import {FC} from 'react';

interface Props {
  children: React.ReactNode;
}
const layout: FC<Props> = ({children}) => {
  return <>{children}</>;
};

export default layout;
