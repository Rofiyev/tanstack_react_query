import { Routes, Route } from "react-router-dom";
import { Home, PostDetail, CreatePost } from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/create" element={<CreatePost />} />
    </Routes>
  );
}
