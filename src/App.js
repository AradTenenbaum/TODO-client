import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";


import Login from './Components/Login';
import Register from './Components/Register';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
          <Route exact path="/" component={Login}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
      </Router>
    </div>
  );
}

export default App;
