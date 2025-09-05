import {ReactNode} from 'react';

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

const layout = ({children, modal}: Props) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default layout;
