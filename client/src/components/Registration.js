import React, { useState } from "react";
import axios from "axios";
import "./components.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      if (res.data.success) {
        navigate("/home");
        toast.success(res.data.message);
      } else {
        toast.false(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };
  const userLogged = () => {
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="registration">
        <h1>User Registration</h1>
        <label>
          <p>Name:</p>
          <input
            type="text"
            placeholder="Enter your name"
            maxLength={22}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
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
          Submit
        </button>
        {/* <ToastContainer /> */}
        <p>or</p>
        <button className="log" onClick={userLogged}>
          Login
        </button>
      </div>
    </form>
  );
};

export default Register;
