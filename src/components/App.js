import React from "react";

import RepoApp from "./RepoApp";

import logo from "../assets/img/logo.png";

import "../assets/css/app.scss";

function App() {
  return (
    <div className="app">
      <div className="nav">
        <div className="logo">
          <img src={logo} alt="brightwheel" width="50px" />
        </div>
        <div className="title">brightwheel: Top 100 Most Starred Github Repos</div>
      </div>
      <div className="content">
        <RepoApp />
      </div>
    </div>
  );
}

export default App;
