// import TopNav from './header/TopNav.tsx';
import Headline from './header/Headline.tsx';
import Toolbar from './header/Toolbar.tsx';
import React from 'react';

interface HeaderProps {
  onNewPost: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewPost }) => {
  return (
    <header className="flex justify-between align-bottom sm:block">
      {/* <TopNav /> */}
      <Headline />
      <Toolbar onNewPost={onNewPost} />
    </header>
  );
};

export default Header;
