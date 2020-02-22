import React, { useState } from "react";
import { axiosWithAuth } from "../axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [creds, setCreds] = useState({ username: "", password: "" });
  const { username, password } = creds;

  const handleChange = event =>
    setCreds({ ...creds, [event.target.name]: event.target.value });

  const attemptLogin = form =>
    axiosWithAuth()
      .post("/login", form)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/");
      })
      .catch(() => localStorage.removeItem("token"));

  const handleSubmit = event => {
    event.preventDefault();
    attemptLogin(creds);
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
