import { FC, ReactNode } from 'react';

interface PostData {
  title: string;
  dateCreated: string;
  timeCreated: string;
  dateEdit: string;
  timeEdit: string;
  content: string | string[];
  edit: boolean;
}

interface PostProps {
  postData: PostData;
  children: ReactNode;
  isOptionsOpen: boolean;
  setIsOptionsOpen: (open: boolean) => void;
}

/**
 * Post component for displaying a single post and its options.
 * @param postData - The data for the post to display.
 * @param children - Any child elements (e.g., options menus).
 * @param isOptionsOpen - Whether the options menu is open for this post.
 * @param setIsOptionsOpen - Callback to open/close the options menu.
 */
const Post: FC<PostProps> = ({ postData, children, isOptionsOpen, setIsOptionsOpen }) => {
  return (
    <div className='flex flex-col relative justify-start w-full max-w-full sm:mx-2 py-2 px-2 rounded-[20px] border border-gray-200 sm:w-[450px] sm:max-w-[95vw] sm:py-[12px] sm:px-[16px]'>
      <h2 className='text-2xl font-semibold mb-2 max-w-[80%] sm:max-w-[unset]'>{postData.title}</h2>
      <button
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        aria-label='open options'
        className='absolute top-4 right-4 cursor-pointer hover:bg-primary-100 p-1 rounded-full hover:transition-colors hover:duration-200'
      >
        <img src="./assets/elipses.svg" alt="open options" />
      </button>
      <p className='text-sm'>{postData.dateCreated}({postData.timeCreated})
        <span className='text-primary-400'>{postData.edit && ` Edited: ${postData.dateEdit}(${postData.timeEdit})`}</span></p>
      <div>
        {Array.isArray(postData.content)
          ? postData.content.map((line, idx) => <p key={idx}>{line}</p>)
          : <p className='text-[16px]'>{postData.content}</p>}
      </div>
      {children}
    </div>
  );
};

export default Post;