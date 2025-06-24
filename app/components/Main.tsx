import { WrapperProps } from '../types';
import Wrapper from './layout/Wrapper';


/**
 * Main layout wrapper for the main content area.
 * Applies grid layout and vertical spacing.
 * @param children - The content to be wrapped.
 */
const Main = ({ children }: WrapperProps) => {
  return (
    <Wrapper>
      <main className="grid gap-[24px] my-[24]">{children}</main>
    </Wrapper>
  );
};

export default Main;