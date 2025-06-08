"use client";

import { FC, useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Main from './components/Main.tsx';
import Post from './components/posts/Post.tsx';
import PostForm from './components/posts/PostForm';
import mockPostData from './mockData/postData.json';

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
  const [posts, setPosts] = useState<PostData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [openOptionsIdx, setOpenOptionsIdx] = useState<number | null>(null);

  // On mount, load posts from localStorage or initialize with mockData if empty
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('posts');
      if (stored) {
        setPosts(JSON.parse(stored));
      } else {
        localStorage.setItem('posts', JSON.stringify(mockPostData));
        setPosts(mockPostData);
      }
    }
  }, []);

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
        <div className={`flex flex-col gap-4 pointer-events-auto ${(showForm || (editIdx !== null)) && 'pointer-events-none'}`}>
          {posts.map((post, idx) => {
            const isOpen = openOptionsIdx === idx;
            return (
              <div key={idx}>
                <Post
                  postData={post}
                  isOptionsOpen={isOpen}
                  setIsOptionsOpen={(open) => setOpenOptionsIdx(open ? idx : null)}
                >
                  {isOpen && (
                    <div className="absolute top-2 -right-20 flex flex-col gap-2 p-2 border-[1px] border-gray-100 drop-shadow-sm shadow-gray-500 rounded-md bg-white">
                      <button
                        className="flex gap-2 rounded hover:opacity-50 transition-opacity cursor-pointer"
                        onClick={() => {
                          handleDelete(idx);
                          setOpenOptionsIdx(null);
                        }}
                        aria-label="Delete post"
                      >
                        <img src="./assets/pencil-edit.svg" />
                        Delete
                      </button>
                      <button
                        className="flex gap-2 rounded text-red-700 hover:opacity-70 transition-opacity cursor-pointer"
                        onClick={() => {
                          handleEdit(idx);
                          setOpenOptionsIdx(null);
                        }}
                        aria-label="Edit post"
                      >
                        <img src="./assets/trash.svg" />
                        Edit
                      </button>
                    </div>
                  )}
                </Post>
              </div>
            );
          })}
        </div>
      </Main>
    </>
  );
};

export default Home;