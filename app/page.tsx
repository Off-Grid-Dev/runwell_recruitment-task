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
  showDeleteConfirm?: boolean;
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
                    <>
                      {/* Desktop options */}
                      <div className="hidden sm:absolute sm:top-2 sm:-right-20 sm:flex sm:flex-col sm:gap-2 sm:p-2 sm:border-[1px] sm:border-gray-100 sm:drop-shadow-sm sm:shadow-gray-500 sm:rounded-md sm:bg-white">
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
                      </div>
                      {/* Mobile options drawer/modal */}
                      <div
                        className={`sm:hidden fixed inset-0 z-50 grid bg-primary-modal backdrop-blur-xs transition-all duration-300`}
                      >
                        {openOptionsIdx === idx && openOptionsIdx !== null && openOptionsIdx === idx && posts[idx]?.showDeleteConfirm ? (
                          <div className={`flex flex-col gap-4 p-3 relative bg-white shadow-md rounded-t-xl w-full max-w-full mt-auto animate-slideup`}>
                            <div className='grid place-content-center w-12 h-12 mr-auto mb-2 p-3 aspect-square bg-red-300 rounded-full'>
                              <img src="/assets/warning.svg" alt="Warning" className="" />
                            </div>
                            <div className='font-bold text-left'>Delete message?</div>
                            <div className="font-md text-left">Are you sure you want to delete the message? Once the message is deleted, it can not be restored or accessed again</div>
                            <div className="flex flex-col gap-4 w-full mt-2">
                              <button
                                className="flex-1 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
                                onClick={() => {
                                  handleDelete(idx);
                                  setOpenOptionsIdx(null);
                                }}
                              >
                                Delete message
                              </button>
                              <button
                                className="flex-1 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-colors"
                                onClick={() => {
                                  setPosts(posts => posts.map((p, i) => i === idx ? { ...p, showDeleteConfirm: false } : p));
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className={`flex flex-col gap-4 p-3 relative bg-white shadow-md rounded-t-xl w-full max-w-full mt-auto animate-slideup`}
                          >
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
                            <button
                              className="flex gap-2 rounded hover:opacity-50 transition-opacity cursor-pointer"
                              onClick={() => {
                                setPosts(posts => posts.map((p, i) => i === idx ? { ...p, showDeleteConfirm: true } : p));
                              }}
                              aria-label="Delete post"
                            >
                              <img src="./assets/pencil-edit.svg" />
                              Delete
                            </button>
                            <button
                              onClick={() => setOpenOptionsIdx(null)}
                              className="absolute top-3 right-3 hover:opacity-50 cursor-pointer hover:transition-opacity z-10"
                              aria-label="Close options"
                            >
                              <img src="/assets/close-x.svg" alt="close options" />
                            </button>
                          </div>
                        )}
                      </div>
                    </>
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