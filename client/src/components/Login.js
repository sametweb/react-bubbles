import React, { useState } from "react";
import { css } from "@emotion/core";
import { axiosWithAuth } from "../axiosWithAuth";
import PacmanLoader from "react-spinners/PacmanLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [creds, setCreds] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { username, password } = creds;

  const handleChange = event =>
    setCreds({ ...creds, [event.target.name]: event.target.value });

  const attemptLogin = form => {
    setIsLoading(!isLoading);
    axiosWithAuth()
      .post("/login", form)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        setIsLoading(!isLoading);
        props.history.push("/");
      })
      .catch(() => {
        setIsLoading(!isLoading);
        localStorage.removeItem("token");
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    attemptLogin(creds);
  };

  if (isLoading)
    return (
      <PacmanLoader
        css={override}
        size={100}
        //size={"150px"} this also works
        color={"black"}
        loading={isLoading}
      />
    );

  return (
    <div className="login">
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password:
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
    </div>
  );
};

export default Login;
