import { FC } from 'react';

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
}

const Post: FC<PostProps> = ({ postData }) => {
  return (
    <div className='flex flex-col justify-start mr-auto w-[450px] py-[12px] px-[16px] rounded-[20px] border border-gray-200'>
      <h2 className='text-2xl font-semibold'>{postData.title}</h2>
      <p className='text-sm'>{postData.dateCreated}({postData.timeCreated})
        <span className='text-primary-400'>{postData.edit && ` Edited: ${postData.dateEdit}(${postData.timeEdit})`}</span></p>
      <div>
        {Array.isArray(postData.content)
          ? postData.content.map((line, idx) => <p key={idx}>{line}</p>)
          : <p>{postData.content}</p>}
      </div>
    </div>
  );
};

export default Post;