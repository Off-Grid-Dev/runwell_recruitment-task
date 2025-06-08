import { ReactNode } from 'react';
import { WrapperProps } from '../types';

/**
 * Main layout wrapper for the main content area.
 * Applies grid layout and vertical spacing.
 * @param children - The content to be wrapped.
 */
const Main = ({ children }: WrapperProps) => {
  return (
    <div className="desktop:max-w-wrapper-desktop tablet:max-w-wrapper-tablet max-w-wrapper-mobile w-full mx-auto sm:px-[48px] px-3">
      <main className="grid gap-[24px] my-[24]">{children}</main>
    </div>
  );
};

export default Main;