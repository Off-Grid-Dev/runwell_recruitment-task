"use client";

import { FC, useState, useRef, useEffect } from 'react';

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
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

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

  const handleClose = () => {
    if (window.innerWidth < 640 && !isClosing) { // Only animate on mobile
      setIsClosing(true);
      closeTimeout.current = setTimeout(() => {
        setIsClosing(false);
        if (onCancel) onCancel();
      }, 300); // match animation duration
    } else {
      if (onCancel) onCancel();
    }
  };

  // Clean up timeout if unmounted early
  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  return (
    <div
      className={
        'fixed inset-0 z-50 grid sm:place-content-center bg-primary-modal backdrop-blur-xs' +
        ' transition-all duration-300' +
        ' sm:px-0' +
        ' [&>*]:transition-all [&>*]:duration-300'
      }
    >
      <form
        className={
          'flex flex-col gap-4 p-3 relative bg-white shadow-md rounded-t-xl w-full max-w-full mt-auto' +
          ' sm:static sm:rounded-xl sm:w-[380px] sm:max-w-[95vw] sm:mx-auto sm:left-auto sm:p-4' +
          ' transition-transform duration-300' +
          (isClosing ? ' animate-slidedown sm:animate-none' : ' animate-slideup sm:animate-none')
        }
        onSubmit={handleSubmit}
      >
        <div className='relative'>
          <h3 className="text-lg font-bold relative after:content-[''] after:absolute after:top-auto after:-bottom-2 after:-left-4 after:-right-4 after:h-[1px] after:bg-gray-300">{isEdit ? 'Edit Post' : 'Create New Post'}</h3>
          {onCancel && (
            <button
              onClick={handleClose}
              type='button'
              className='absolute top-2 sm:top-0 right-2 hover:opacity-50 cursor-pointer hover:transition-opacity'
            >
              <img src="/assets/close-x.svg" alt="close window" />
            </button>
          )}
        </div>
        <div className='relative mt-2'>
          <label className='absolute left-2 -top-2 text-xs bg-white px-1' htmlFor="formTitle">Title</label>
          <input
            id='formTitle'
            className="border border-gray-300 hover:border-gray-100 outline outline-transparent focus:outline-primary-400 rounded px-2 py-1 transition-colors duration-200 w-full sm:w-auto"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <textarea
          className="border border-gray-300 hover:border-gray-100 outline outline-transparent focus:outline-primary-400 rounded px-2 py-1 min-h-[76px] transition-colors duration-200 w-full sm:w-[342px]"
          placeholder="Description"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
        <button type="submit" className="py-1 w-full sm:rounded rounded-full bg-primary-400 hover:bg-primary-600 transition-colors cursor-pointer text-white">{isEdit ? 'Save' : 'Create'}</button>
      </form>
    </div>
  );
};

export default PostForm;