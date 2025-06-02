import React, { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <div className="max-w-wrapper-desktop w-full mx-auto">
    {children}
  </div>
);

export default Wrapper;