import React from "react";

function Login() {
    
    
  return (
    <div>
      <div className="container">
        <div className="page-header">
          <h1>Login</h1>
          <p>Connect to enter tasks</p>
        </div>
      </div>
      <form className="container">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
