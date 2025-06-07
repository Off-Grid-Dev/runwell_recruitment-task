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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-xl bg-white shadow-md max-w-md mx-auto">
      <h3 className="text-lg font-bold">{isEdit ? 'Edit Post' : 'Create New Post'}</h3>
      <input
        className="border rounded px-2 py-1"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        className="border rounded px-2 py-1 min-h-[80px]"
        placeholder="Description"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
      <div className="flex gap-2 justify-end">
        {onCancel && <button type="button" className="px-3 py-1 rounded bg-gray-200" onClick={onCancel}>Cancel</button>}
        <button type="submit" className="px-3 py-1 rounded bg-primary-400 text-white">{isEdit ? 'Update' : 'Create'}</button>
      </div>
    </form>
  );
};

export default PostForm;
