import TopNav from './header/TopNav.tsx';
import Headline from './header/Headline.tsx';
import Toolbar from './header/Toolbar.tsx';

const Header = () => {
  return (
    <header>
      <TopNav />
      <Headline />
      <Toolbar />
    </header>
  )
}

export default Header;