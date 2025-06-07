"use client";

import { useState } from 'react';
import Wrapper from "../layout/Wrapper.tsx";

const Toolbar = ({ onNewPost }: { onNewPost: () => void }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <Wrapper>
      <div className="flex align-center gap-[24px]">
        <button
          className="flex gap-4 hover:opacity-80 text-primary-400 font-medium border border-primary-400 px-[18px] py-[8px] rounded-full cursor-pointer transition-colors duration-150"
          aria-label="add new post"
          onClick={onNewPost}
        >
          <span className="scale-175 origin-center relative -top-[3px]">+</span>
          <span>New Message</span>
        </button>
        <div className='relative bg-gray-100 py-[8px] px-[24px] rounded-full' aria-label="search through posts">
          <input type="text" placeholder='Search' className='peer placeholder:px-[20px] focus:placeholder:opacity-0 outline-none' maxLength={32} />
          <img className='absolute top-[12px] left-[12px] peer-focus:opacity-0' src="./assets/search.png" />
        </div>
        <div className='flex'>
          <span className="align-middle">Date</span>
        </div>
      </div>
    </Wrapper>
  )
}

export default Toolbar;