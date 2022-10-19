import { Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Detail from "./pages/detail";

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="detail/:detailId" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
