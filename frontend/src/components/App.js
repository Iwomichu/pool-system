import React from "react";
import ReactDOM from "react-dom";
import Greeter from "./Greeter";

const App = () => <Greeter />;
const wrapper = document.getElementById("app");

wrapper ? ReactDOM.render(<App />, wrapper) : null;
