import React from "react";
import { Routes, Route } from "react-router-dom";
import { PostsManagerPage } from "./postsManager";

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PostsManagerPage />} />
    </Routes>
  );
};
// pages 폴더의 모든 페이지 컴포넌트들을 여기서 export
export { PostsManagerPage } from "./postsManager";