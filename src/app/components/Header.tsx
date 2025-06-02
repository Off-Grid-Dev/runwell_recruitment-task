import TopNav from './pieces/TopNav.tsx';
import Headline from './pieces/Headline.tsx';
import Toolbar from './pieces/Toolbar.tsx';

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