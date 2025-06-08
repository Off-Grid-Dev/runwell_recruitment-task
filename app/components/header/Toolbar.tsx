"use client";

// import { useState } from 'react';
import Wrapper from "../layout/Wrapper.tsx";

const Toolbar = ({ onNewPost }: { onNewPost: () => void }) => {
  // const [searchText, setSearchText] = useState('');

  return (
    <Wrapper>
      <div className="flex justify-between sm:justify-start w-full align-middle gap-[24px]">
        <button
          className="flex gap-4 hover:opacity-80 text-primary-400 font-medium border border-primary-400 px-[18px] py-[8px] rounded-full cursor-pointer transition-colors duration-150"
          aria-label="add new post"
          onClick={onNewPost}
        >
          <span className="scale-175 origin-center relative -top-[3px]">+</span>
          <span>New Message</span>
        </button>
        <div className='relative hidden tablet:inline-block bg-gray-100 py-[8px] px-[24px] rounded-full cursor-not-allowed' aria-label="search through posts">
          <input type="text" placeholder='Search' className='peer placeholder:px-[20px] focus:placeholder:opacity-0 outline-none cursor-not-allowed' maxLength={32} />
          <img className='absolute top-[12px] left-[12px] peer-focus:opacity-0' src="./assets/search.svg" />
        </div>
        <div className='flex align-middle my-auto gap-2 cursor-not-allowed'>
          <img className="inline-block m-auto" src="./assets/sort-selector.svg" alt="sort items" />
        </div >
      </div>
    </Wrapper>
  )
}

export default Toolbar;