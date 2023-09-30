import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Register from "./components/Registration";
import Login from "./components/Login";
// import { useNavigate } from "react-router-dom";

function App() {
  return (
    <div className="main-container">
      <div className="container">
        <h1 className="heading">Add Todo List</h1>
        <hr />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
