import React from "react";

import CommitList from "./CommitList";

import "../assets/css/repo-page.scss";

export default class RepoPage extends React.Component {
  onBack = () => {
    this.props.onRepoClick(null);
  }

  render() {
    const { repoId, repos } = this.props;
    const repo = repos.filter(repo => repo.id === repoId)[0];

    return (
      <div className="repo-page">
        <div className="repo-page__row">
          <button onClick={this.onBack} className="button secondary" data-repoid={repo.id}>{"<- "} Back to Repos</button>
        </div>
        <div className="repo-page__row">
          <span>
            <h1 className="h1">{repo.name}</h1>
          </span>
          <div className="repo-card__star-count">
            {repo.stargazers_count}
            {" "}
            <span role="img" aria-label="stars">⭐️</span>
          </div>
        </div>
        <div className="repo-page__row">
          <span><b>Owned by:</b> <a href={`https://github.com/${repo.owner.login}`} target="_blank" rel="noopener noreferrer">{repo.owner.login}</a></span>
        </div>
        <div className="repo-page__row">
          <span><b>URL:</b> <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.html_url}</a></span>
        </div>
        <div className="repo-page__row">
          <p>{repo.description}</p>
        </div>
        <div className="repo-page__row">
          <CommitList ownerId={repo.owner.id} repoId={repo.id} />
        </div>
      </div>
    );
  }
}
