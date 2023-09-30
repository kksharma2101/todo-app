import React, { useState } from "react";
import "./components.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", { email, password });
      if (res.data.success) {
        navigate("/home");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="registration">
        <h1>User Login</h1>
        <label>
          <p>Email:</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password:</p>
          <input
            type="password"
            placeholder="Enter your password"
            maxLength={10}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="submit" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
