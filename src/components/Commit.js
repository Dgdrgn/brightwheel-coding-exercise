import React from "react";

import "../assets/css/commit.scss";

export default class Commit extends React.Component {
  render() {
    const { commit } = this.props;

    return (
      <div className="commit">
        <a href={`https://github.com/${commit.author.login}`} target="_blank" rel="noopener noreferrer"><b>{commit.commit.author.name}</b></a>
        <p>{commit.commit.author.date}</p>
        <div className="commit__message">
          <p>{commit.commit.message}</p>
        </div>
      </div>
    );
  }
}
