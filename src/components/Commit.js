import React from "react";

import { formatISODateToUSDate } from "../utils";

import "../assets/css/commit.scss";

export default class Commit extends React.Component {
  render() {
    const { commit } = this.props;

    return (
      <div className="commit">
        <div className="commit__name-and-date">
          <p>
            <a href={`https://github.com/${commit.author.login}`} target="_blank" rel="noopener noreferrer">
              <b>{commit.commit.author.name}</b>
            </a>
          </p>
          <p>{formatISODateToUSDate(commit.commit.author.date)}</p>
        </div>
        <div className="commit__message">
          <p>{commit.commit.message}</p>
        </div>
      </div>
    );
  }
}
