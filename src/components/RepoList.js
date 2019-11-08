import React from "react";

import RepoCard from "./RepoCard";

import "../assets/css/repo-list.scss";

export default class RepoList extends React.Component {
  render() {
    const { repos } = this.props;
    return (
      <div className="repo-list">
        {repos.map(repo => (
          <div key={repo.id}><RepoCard repo={repo} onRepoClick={this.props.onRepoClick} /></div>
        ))}
      </div>
    );
  }
}
