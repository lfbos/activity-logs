import { Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";

import './App.css';

function requireAuth(nextState, replace) {
  console.log(nextState);
  console.log(replace);
  const accessToken = localStorage.getItem("__ACCESS_TOKEN");
  if (accessToken != null) {
    replace('/login');
  }
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} onEnter={requireAuth} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
