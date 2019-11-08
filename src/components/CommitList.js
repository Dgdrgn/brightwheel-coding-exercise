import React from "react";

import Commit from "./Commit";

import "../assets/css/commit-list.scss";

export default class CommitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commits: [],
      error: false,
      loading: false
    }
  }

  fetchCommits = async () => {
    const { ownerId, repoId } = this.props;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayAsString = yesterday.toISOString();

    this.setState({ loading: true });

    try {
      // TODO: Move token somewhere more secure
      const token = "6af85478c728fbf0914835bd14c21e4f64e2ae0a";
      const response = await fetch(`https://api.github.com/repos/${ownerId}/${repoId}/commits?since=${yesterdayAsString}`, {
        method: "GET",
        headers: new Headers({
          "Authorization": `token ${token}`
        })
      });
      const json = await response.json();
      if (json.message) {
        // Error - sometimes not caught by try/catch
        this.setState({ commits: [], error: true, loading: false });
      } else {
        this.setState({ commits: json, error: false, loading: false });
      }
    } catch(e) {
      this.setState({ commits: [], error: true, loading: false });
    }
  }

  componentDidMount = () => {
    this.fetchCommits();
  }

  render() {
    const { commits, error, loading } = this.state;
    
    return (
      <div className="commit-list">
        <h2 className="h3">Commits - Last 24 Hrs</h2>
        {loading ? (
          <div className="loading">
            Loading...
          </div>
        ) : (
          <>
            {error ? (
              <div className="error-banner">
                There was an error getting commits. Please refresh the page and try again.
              </div>
            ) : (
              <>
                {commits.map(commit => (
                  <Commit commit={commit} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    )
  }
}
