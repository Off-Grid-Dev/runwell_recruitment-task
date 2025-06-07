import { FC } from 'react'

import Header from './components/Header.tsx';
import Main from './components/Main.tsx';
import Post from './components/posts/Post.tsx';
import mockPostData from './mockData/postData.json' assert {type: "json"};


const Home: FC = () => {
  return (
    <>
      <Header />
      <Main>
        {mockPostData.map((post, idx) => (
          <Post key={idx} postData={post} />
        ))}
      </Main>
    </>
  );
}

export default Home;