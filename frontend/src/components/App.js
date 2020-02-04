import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Dashboard from "./../views/Dashboard";
import Contact from "./../views/Contact";
import About from "./../views/About";
import Navbar from "./Navbar/Navbar";
import Greeter from "./Greeter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <div role="main" className="container-fluid h-100">
          <Switch>
            <Route exact path="/">
              <Greeter />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;
