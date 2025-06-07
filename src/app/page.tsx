"use client";

import { FC, useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Main from './components/Main.tsx';
import Post from './components/posts/Post.tsx';
import PostForm from './components/posts/PostForm';
import mockPostData from './mockData/postData.json' assert {type: "json"};

interface PostData {
  title: string;
  dateCreated: string;
  timeCreated: string;
  dateEdit: string;
  timeEdit: string;
  content: string | string[];
  edit: boolean;
}

const getNow = () => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return {
    date: `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear().toString().slice(-2)}`,
    time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
  };
};

const Home: FC = () => {
  const [posts, setPosts] = useState<PostData[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('posts');
      if (stored) return JSON.parse(stored);
    }
    return mockPostData;
  });
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);

  // Persist posts to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  }, [posts]);

  const handleCreate = (data: { title: string; content: string | string[] }) => {
    const now = getNow();
    setPosts([
      {
        title: data.title,
        content: data.content,
        dateCreated: now.date,
        timeCreated: now.time,
        dateEdit: now.date,
        timeEdit: now.time,
        edit: false,
      },
      ...posts,
    ]);
    setShowForm(false);
  };

  const handleEdit = (idx: number) => setEditIdx(idx);

  const handleUpdate = (data: { title: string; content: string | string[] }) => {
    if (editIdx === null) return;
    const now = getNow();
    setPosts(posts =>
      posts.map((post, idx) =>
        idx === editIdx
          ? {
            ...post,
            title: data.title,
            content: data.content,
            dateEdit: now.date,
            timeEdit: now.time,
            edit: true,
          }
          : post
      )
    );
    setEditIdx(null);
  };

  const handleDelete = (idx: number) => {
    setPosts(posts => posts.filter((_, i) => i !== idx));
  };

  return (
    <>
      <Header onNewPost={() => setShowForm(true)} />
      <Main>
        {showForm && (
          <PostForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        )}
        {editIdx !== null && (
          <PostForm
            initialData={posts[editIdx]}
            onSubmit={handleUpdate}
            onCancel={() => setEditIdx(null)}
            isEdit
          />
        )}
        <div className="flex flex-col gap-4">
          {posts.map((post, idx) => (
            <div key={idx} className="relative group">
              <Post postData={post} />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
                  onClick={() => handleDelete(idx)}
                  aria-label="Delete post"
                >
                  Delete
                </button>
                <button
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
                  onClick={() => handleEdit(idx)}
                  aria-label="Edit post"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </Main>
    </>
  );
};

export default Home;