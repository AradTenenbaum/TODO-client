import React, { useContext, useEffect, useState } from "react";

import { useForm } from "../Hooks/useForm";
import { AuthContext } from "../context/auth";
import { useHistory } from "react-router-dom";

function Login() {
  const context = useContext(AuthContext);
  const [isError, setIsError] = useState(false);
  const history = useHistory();
  useEffect(() => {
      if(context.user) history.push('/');
  }, []);

  const loginUserCallback = () => {
    loginApi();
  };

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const loginApi = async () => {
    const err = await context.login(values);
    if (err) setIsError(true);
    else {
      setIsError(false);
      history.push('/');
    }
  };


  return (
    <div>
      <div className="container">
        <div className="page-header">
          <h1>Login</h1>
          <p>Connect to enter tasks</p>
        </div>
      </div>
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            name="username"
            value={values.username}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={onChange}
          />
        </div>
        {isError ? (
          <div className="danger-text">Username/Password is wrong.</div>
        ) : (
          <div></div>
        )}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
