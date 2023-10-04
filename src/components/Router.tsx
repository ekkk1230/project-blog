import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/home';
import PostList from '../pages/posts';
import PostDetail from '../pages/posts/detail';
import PostNew from '../pages/posts/new';
import PostEdit from '../pages/posts/edit';
import ProfilePage from '../pages/profile';
import LoginPage from '../pages/login';
import SingupPage from '../pages/signup';

interface RouterProps {
  isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {

  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/posts/new" element={<PostNew />} />
            <Route path="/posts/edit/:id" element={<PostEdit />} />
            <Route path="/profile" element={<ProfilePage />} />
    
            <Route path="*" element={<Navigate replace to="/" />} /> {/* 예외 정의되지 않은 루트를 이용해 접속했을 때 강제로 루트페이지로 이동됨 */}
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SingupPage />} />
            <Route path="/*" element={<LoginPage />} />
          </>
        )}
        
      </Routes>
    </>

  );
}
