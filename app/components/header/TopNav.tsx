import Link from "next/link";

/**
 * Top navigation bar for the app, including logo and navigation buttons.
 */
const TopNav = () => {
  return (
    <div className='top-nav'>
      <div className='col-span-1'>
        <Link className="grid align-bottom" href={'/'}>
          <img src="./assets/runwell-logo_dark.svg" alt="runwell logo" />
        </Link>
      </div>
      <div className='col-span-5 col-start-4 flex justify-evenly'>
        <button className='hover:opacity-70 hover:duration-150 transition-opacity duration-300 cursor-pointer'>
          <img src="./assets/home.svg" alt="return home" />
        </button>
        <button className='hover:opacity-70 hover:duration-150 transition-opacity duration-300 cursor-pointer'>
          <img src="./assets/my-tasks.svg" alt="see your tasks" />
        </button>
        <button className='hover:opacity-70 hover:duration-150 transition-opacity duration-300 cursor-pointer'>
          <img src="./assets/clock.svg" alt="check schedule" />
        </button>
        <button className='hover:opacity-70 hover:duration-150 transition-opacity duration-300 cursor-pointer'>
          <img src="./assets/academic.svg" />
        </button>
        <button className='hover:opacity-70 hover:duration-150 transition-opacity duration-300 cursor-pointer'>
          <img src="./assets/chat.svg" alt="start chat" />
        </button>
      </div>
      <div className='col-span-2 col-start-10 flex justify-evenly'>
        <button className='cta'>
          <span className="text-primary-400 scale-175 origin-center relative -top-[3px]">+</span>
        </button>
        <button className='cta'>
          <img src="./assets/bell.svg" />
        </button>
        <button className='cta'>
          <img src="./assets/apps.svg" />
        </button>
      </div>
    </div>
  )
}

export default TopNav;