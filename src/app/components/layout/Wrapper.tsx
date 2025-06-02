import { ReactNode, FC } from 'react';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <div className={`desktop:max-w-wrapper-desktop tablet:max-w-wrapper-tablet max-w-wrapper-mobile w-full mx-auto`}>
      {children}
    </div>
  );
};

export default Wrapper;