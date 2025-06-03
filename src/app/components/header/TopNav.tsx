import Link from "next/link";

const TopNav = () => {
  return (
    <div className='top-nav'>
      <div className='col-span-1'>
        <Link className="grid align-bottom" href={'/'}>
          <img src="./assets/runwell-logo_dark.png" alt="runwell logo" />
        </Link>
      </div>
      <div className='col-span-5 col-start-4 flex justify-evenly'>
        <button className='hover:opacity-70 hover:duration-150 transition-opacity duration-300 cursor-pointer'>
          <img src="./assets/home.png" alt="return home" />
        </button>
        <button className='hover:opacity-70 hover:duration-150 transition-opacity duration-300 cursor-pointer'>
          <img src="./assets/my-tasks.png" alt="see your tasks" />
        </button>
        <button className='hover:opacity-70 hover:duration-150 transition-opacity duration-300 cursor-pointer'>
          <img src="./assets/clock.png" alt="check schedule" />
        </button>
        <button className='hover:opacity-70 hover:duration-150 transition-opacity duration-300 cursor-pointer'>
          <img src="./assets/academic.png" />
        </button>
        <button className='hover:opacity-70 hover:duration-150 transition-opacity duration-300 cursor-pointer'>
          <img src="./assets/chat.png" alt="start chat" />
        </button>
      </div>
      <div className='col-span-2 col-start-10 flex justify-evenly'>
        <button className='cta'>
          <span className="text-primary-400 scale-175 origin-center relative -top-[3px]">+</span>
        </button>
        <button className='cta'>
          <img src="./assets/bell.png" />
        </button>
        <button className='cta'>
          <img src="./assets/apps.png" />
        </button>
      </div>
    </div>
  )
}

export default TopNav;