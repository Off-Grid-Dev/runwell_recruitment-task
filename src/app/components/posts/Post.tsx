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
    <div>
      <h2>{postData.title}</h2>
      <p>{postData.dateCreated}({postData.timeCreated}){postData.edit && ` Edited: ${postData.dateEdit}(${postData.timeEdit})`}</p>
      <div>
        {Array.isArray(postData.content)
          ? postData.content.map((line, idx) => <p key={idx}>{line}</p>)
          : <p>{postData.content}</p>}
      </div>
    </div>
  );
};

export default Post;