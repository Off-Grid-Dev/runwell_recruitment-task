import { ReactNode } from 'react';
import Wrapper from './layout/Wrapper';

type Props = { children: ReactNode }

const Main = ({ children }: Props) => {
  return (
    <Wrapper >
      <main className='grid gap-[24px] my-[24]'>{children}</main>
    </Wrapper>
  )
}

export default Main;