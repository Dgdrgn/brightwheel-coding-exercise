import React from "react";

import "../assets/css/repo-card.scss";

export default class RepoCard extends React.Component {
  onClick = (event) => {
    const repoId = parseInt(event.currentTarget.getAttribute("data-repoid"));
    this.props.onRepoClick(repoId);
  }
  
  render() {
    const { repo } = this.props;

    return (
      <div className="repo-card">
        <div className="repo-card__row">
          <h2 className="h2">{repo.name}</h2>
          <div className="repo-card__star-count">
            {repo.stargazers_count}
            {" "}
            <span role="img" aria-label="stars">⭐️</span>
          </div>
        </div>
        <div className="repo-card__row">
          <span><b>Owned by:</b> <a href={`https://github.com/${repo.owner.login}`} target="_blank" rel="noopener noreferrer">{repo.owner.login}</a></span>
        </div>
        <div className="repo-card__row">
          <span><b>URL:</b> <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.html_url}</a></span>
        </div>
        <div className="repo-card__row">
          <button onClick={this.onClick} className="button primary" data-repoid={repo.id}>See More</button>
        </div>
      </div>
    );
  }
}
