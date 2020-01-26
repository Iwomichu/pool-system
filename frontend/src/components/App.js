import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import Greeter from "./Greeter";

export class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <div role="main" className="container-fluid h-100"></div>
        <div className="row">
          <div className="col-1 bg-light sidebar">
            <Sidebar />
          </div>
          <div className="col-9 px-4 pt-3 ml-sm-auto">
            <Greeter />
          </div>
        </div>
      </Fragment>
    );
  }
}
export default App;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;
