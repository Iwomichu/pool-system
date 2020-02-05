import React, { Component, Fragment } from "react";
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

export class App extends Component {
  render() {
    return (
      <AuthContext.Provider value={false}>
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
}
export default App;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;
