"use client";

import { FC, useState } from 'react';

interface PostData {
  title: string;
  dateCreated: string;
  timeCreated: string;
  dateEdit: string;
  timeEdit: string;
  content: string | string[];
  edit: boolean;
}

interface PostFormProps {
  initialData?: Partial<PostData>;
  onSubmit: (data: Omit<PostData, 'dateCreated' | 'timeCreated' | 'dateEdit' | 'timeEdit' | 'edit'>) => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

const PostForm: FC<PostFormProps> = ({ initialData = {}, onSubmit, onCancel, isEdit }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(
    typeof initialData.content === 'string' ? initialData.content : Array.isArray(initialData.content) ? initialData.content.join('\n') : ''
  );
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and description are required.');
      return;
    }
    setError('');
    onSubmit({
      title: title.trim(),
      content: content.includes('\n') ? content.split('\n') : content.trim(),
    });
  };

  return (
    <div className='fixed inset-0 grid place-content-center bg-primary-modal backdrop-blur-xs z-50'>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 relative rounded-xl bg-white shadow-md mx-auto">
        <h3 className="text-lg font-bold relative after:content-[''] after:absolute after:top-auto after:-bottom-2 after:-left-4 after:-right-4 after:h-[1px] after:bg-gray-300">{isEdit ? 'Edit Post' : 'Create New Post'}</h3>
        <div className='relative'>
          <label className='absolute left-2 -top-2 text-xs bg-white px-1' htmlFor="formTitle">Title</label>
          <input
            id='formTitle'
            className="border border-gray-300 hover:border-gray-100 outline outline-transparent focus:outline-primary-400 rounded px-2 py-1 w-full transition-colors duration-200"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <textarea
          className="border border-gray-300 hover:border-gray-100 outline outline-transparent focus:outline-primary-400 rounded px-2 py-1 min-h-[76px] w-[342px] transition-colors duration-200"
          placeholder="Description"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        {onCancel && <button onClick={onCancel} type='button' className='absolute top-3 right-3 hover:opacity-50 cursor-pointer hover:transition-opacity'><img src="./assets/close-x.svg" alt="close window" /></button>}
        {error && <span className="text-red-500 text-sm">{error}</span>}
        <button type="submit" className="py-1 w-full rounded bg-primary-400 hover:bg-primary-600 transition-colors cursor-pointer text-white">{isEdit ? 'Save' : 'Create'}</button>
      </form>
    </div>
  );
};

export default PostForm;
