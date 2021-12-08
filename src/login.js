import React from "react";
import { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate, NavLink, Navigate } from "react-router-dom";

export default function Login({ handleAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();

    if (email === "") {
      alert("please enter your email id");
      return;
    } else {
      console.log(email);
    }
    if (password === "") {
      alert("please enter your password");
      return;
    } else {
    }

    try {
      await axios.post("https://socketio-chata.herokuapp.com/api/login", {
        email: email,
        password: password,
      });

      alert(" successfully login");
      handleAuth(email);
      navigate("/");
    } catch (err) {
      alert(err);
      navigate("/register");
    }
  };

  if (Boolean(window.localStorage.getItem("auth"))) {
    <Navigate to="/" />;
  }

  return (
    <div>
      <div className="App">
        <div className="box">
          <form onSubmit={add}>
            <span className="text-center">Login</span>

            <div className="input-container">
              <input
                type="email"
                name="email"
                autoComplete="on"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
              <label>Email</label>
            </div>

            <div className="input-container">
              <input
                type="password"
                name="password"
                autoComplete="on"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
              <label>password</label>
            </div>

            <button type="submit" className="btn btn-danger">
              Login
            </button>
            <NavLink
              to="/register
          "
            >
              <button className="btn btn-1 btn-danger">Register</button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}
