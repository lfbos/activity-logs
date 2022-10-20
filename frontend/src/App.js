import { Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import PageNotFound from "./pages/notfound";
import PostPage from "./pages/post";
import { ProtectedRoute } from "./ProtectedRoute";

import './App.css';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>} />
        <Route path="/:postId" element={
          <ProtectedRoute>
            <PostPage/>
          </ProtectedRoute>  
        }/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
