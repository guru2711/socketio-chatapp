import { useState } from "react";
import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();

    if (name === "") {
      alert("please enter your name");
      return;
    } else {
      console.log(name);
    }
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
    if (passwordAgain === password) {
      // console.log(passwordAgain);
      // return;
    } else {
      alert("confirm password doesn't match");
      return;
    }

    try {
      await axios.post("https://socketio-chata.herokuapp.com/api/register", {
        username: name,
        email: email,
        password: password,
      });
      alert("successfully registered");
      navigate("/login");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="App">
      <div className="box">
        <form onSubmit={add}>
          <span className="text-center">Register</span>

          {/* username */}
          <div className="input-container">
            <input
              type="text"
              name="username"
              autoComplete="on"
              onChange={(event) => {
                setName(event.target.value);
              }}
              required
            />
            <label>Username</label>
          </div>

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

          <div className="input-container">
            <input
              type="password"
              name="passwordAgain"
              autoComplete="on"
              onChange={(event) => {
                setPasswordAgain(event.target.value);
              }}
              required
            />
            <label>password again</label>
          </div>

          {/* <div className="input-container">	
          <input type="password" name = "password" autoComplete = "on"   onChange={(event) => {
            setPassword(event.target.value)
          }} />
            <label>password</label>
         
          </div> */}

          {/* <div className="input-container">	
          <input type="password" name = "passwordAgain" autoComplete = "on"   onChange={(event) => {
            setPasswordAgain(event.target.value)
          }} />
           <label>confirm password</label>
          </div> */}

          <button type="submit" className="btn btn-danger">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
