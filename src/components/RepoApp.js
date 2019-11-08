import React from "react";

import RepoPage from "./RepoPage";
import SearchForm from "./SearchForm";
import RepoList from "./RepoList";

export default class RepoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      repoId: null,
      searchQuery: "",
      error: false
    }
  }

  fetchRepos = async () => {
    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=is:public${this.state.searchQuery || ""}&sort=stars&order=desc&page=1&per_page=100`);
      const json = await response.json();
      const first100Repos = json.items.slice(0, 100);
      this.setState({ repos: first100Repos, error: false });
    } catch(e) {
      this.setState({ repos: [], error: true });
    }
  }

  componentDidMount = () => {
    this.fetchRepos();
  }

  onRepoClick = (repoId) => {
    this.setState({ repoId: repoId });
  }

  render() {
    const { repos, repoId, error } = this.state;

    return (
      <div className="repo-app">
        {error ? (
          <div className="error-banner">
            There was an error getting the repos. Please refresh the page and try again.
          </div>
        ) : (
          <>
            {repoId ? (
                <RepoPage repoId={repoId} repos={repos} onRepoClick={this.onRepoClick} />
              ) : (
                <>
                  <SearchForm />
                  <RepoList repos={repos} onRepoClick={this.onRepoClick} />
                </>
              )
            }
          </>
        )}
      </div>
    )
  }
}
