import React from "react";
import { useLocation } from "react-router";

export default function Breadcrumb(props) {
  const location = useLocation();

  return (
    <ol className="breadcrumb">
      {location.pathname.split("/").map(part => (
        <span className="breadcrumb-item text-capitalize">{part}</span>
      ))}
    </ol>
  );
}
