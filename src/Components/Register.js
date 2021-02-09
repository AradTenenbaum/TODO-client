import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth";
import { useForm } from "../Hooks/useForm";
import * as api from '../api';


function Register() {
  const context = useContext(AuthContext);
  const [error, setError] = useState('');
  const history = useHistory();
  useEffect(() => {
      if(context.user) history.push('/');
  }, []);


  const registerUserCallback = () => {
    registerApi();
  };

  function firstLetterCapital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
      username: "",
      password: "",
      passwordAgain: ""
    });

    const registerApi = async () => {
      if(values.password === values.passwordAgain) {
        const user = {
          username: values.username,
          password: values.password
        }
        try {
          const res = await api.register(user);
          await context.login(user);
          setError('');
        } catch (error) {
          setError(firstLetterCapital(error.response.data.replaceAll('"', '')));
        }
      } else {
        setError('Passwords not the same')
      }
    };

  return (
    <div>
      <div className="container">
        <div className="page-header">
          <h1>Register</h1>
          <p>Create a user and start</p>
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
        <div className="form-group">
          <label>Password Again</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password Again"
            name="passwordAgain"
            value={values.passwordAgain}
            onChange={onChange}
          />
        </div>
        {error.length > 0 ? (
          <div className="danger-text">{error}</div>
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

export default Register;
