import React, { useState, Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Dashboard from "./../views/Dashboard";
import Contact from "./../views/Contact";
import About from "./../views/About";
import Navbar from "./Navbar/Navbar";
import Greeter from "./Greeter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "../context/auth";
import Login from "../views/Login";
import Signup from "../views/Signup";

export default function App(props) {
  const [authTokens, setAuthTokens] = useState();
  const setTokens = data => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Navbar />
        <div role="main" className="container-fluid h-100">
          <Switch>
            <Route exact path="/">
              <Greeter />
            </Route>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;
