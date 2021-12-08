import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import Login from "./login";
import PrivateRoute from "./PrivateRoute";

import Register from "./Register";

const handleAuth = (email) => {
  window.localStorage.setItem("auth", JSON.stringify({ email: email }));
};

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login handleAuth={handleAuth} />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <App />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
