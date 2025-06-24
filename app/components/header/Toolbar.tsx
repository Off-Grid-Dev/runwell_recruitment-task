'use client';

import Wrapper from '../layout/Wrapper';
import { HeaderProps } from '../../types';

/**
 * Toolbar component for the header. Contains new post button, search, and sort.
 * @param onNewPost - Callback to trigger new post creation.
 */
const Toolbar = ({ onNewPost }: HeaderProps) => {
  return (
    <Wrapper>
      <div className="flex sm:justify-start justify-end w-full align-self-bottom sm:align-middle min-h-min relative top-[26px] sm:static gap-[24px]">
        <button
          className="flex align-bottom gap-4 hover:opacity-80 text-3xl sm:text-[16px] text-black sm:text-primary-400 sm:font-medium sm:border sm:border-primary-400 sm:px-[18px] sm:py-[8px] sm:rounded-full cursor-pointer transition-colors duration-150"
          aria-label="add new post"
          onClick={onNewPost}
        >
          <span className="sm:scale-175 origin-center relative sm:-top-[2px]">
            +
          </span>
          <span className="hidden sm:inline-block">New Message</span>
        </button>
        <div
          className="relative hidden sm:inline-block bg-gray-100 py-[8px] px-[24px] rounded-full cursor-not-allowed"
          aria-label="search through posts"
        >
          <input
            type="text"
            placeholder="Search"
            className="peer placeholder:px-[20px] focus:placeholder:opacity-0 outline-none cursor-not-allowed"
            maxLength={32}
          />
          <img
            className="absolute top-[12px] left-[12px] peer-focus:opacity-0"
            src="./assets/search.svg"
            alt="click to search"
          />
        </div>
        <button className="flex align-middle cursor-not-allowed w-2 relative top-1 sm:top-0">
          <img
            className="inline-block"
            src="./assets/sort-selector.svg"
            alt="sort items"
          />
        </button>
      </div>
    </Wrapper>
  );
};

export default Toolbar;
