import React, { Component } from "react";
import TopmenuLink from "./TopmenuLink";
import { useAuth } from "../../context/auth";

export default function Menu(props) {
  const isAuthenticated = useAuth();
  return (
    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav mr-auto ml-lg-5 layout-nav-ul">
        {isAuthenticated ? <TopmenuLink url="/dashboard" title="Pulpit" /> : ""}
        <TopmenuLink url="/contact" title="Kontakt" />
        <TopmenuLink url="/about" title="O nas" />
      </ul>
    </div>
  );
}
