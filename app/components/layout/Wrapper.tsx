import { FC } from 'react';
import { WrapperProps } from '../../types';

/**
 * Wrapper component for constraining content width and providing horizontal padding.
 * Applies responsive max-widths for desktop, tablet, and mobile.
 * @param children - The content to be wrapped.
 */
const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <div className="desktop:max-w-wrapper-desktop tablet:max-w-wrapper-tablet max-w-wrapper-mobile w-full mx-auto sm:px-[48px] px-3">
      {children}
    </div>
  );
};

export default Wrapper;