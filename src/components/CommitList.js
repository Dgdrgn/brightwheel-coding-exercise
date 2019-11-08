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
      const token = ""; // Paste token here - not committing it for security reasons
      const response = await fetch(`https://api.github.com/repos/${ownerId}/${repoId}/commits?since=${yesterdayAsString}`, {
        method: "GET",
        headers: new Headers({
          "Authorization": `token ${token}`
        })
      });
      const json = await response.json();
      // MOCK DATA TO TEST SINCE ENDPOINT CALL ISN'T WORKING
      // const json = [
      //   {
      //     "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //     "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //     "node_id": "MDY6Q29tbWl0NmRjYjA5YjViNTc4NzVmMzM0ZjYxYWViZWQ2OTVlMmU0MTkzZGI1ZQ==",
      //     "html_url": "https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //     "comments_url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e/comments",
      //     "commit": {
      //       "url": "https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //       "author": {
      //         "name": "Monalisa Octocat",
      //         "email": "support@github.com",
      //         "date": "2011-04-14T16:00:49Z"
      //       },
      //       "committer": {
      //         "name": "Monalisa Octocat",
      //         "email": "support@github.com",
      //         "date": "2011-04-14T16:00:49Z"
      //       },
      //       "message": "Fix all the bugs",
      //       "tree": {
      //         "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //         "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
      //       },
      //       "comment_count": 0,
      //       "verification": {
      //         "verified": false,
      //         "reason": "unsigned",
      //         "signature": null,
      //         "payload": null
      //       }
      //     },
      //     "author": {
      //       "login": "octocat",
      //       "id": 1,
      //       "node_id": "MDQ6VXNlcjE=",
      //       "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      //       "gravatar_id": "",
      //       "url": "https://api.github.com/users/octocat",
      //       "html_url": "https://github.com/octocat",
      //       "followers_url": "https://api.github.com/users/octocat/followers",
      //       "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      //       "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      //       "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      //       "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      //       "organizations_url": "https://api.github.com/users/octocat/orgs",
      //       "repos_url": "https://api.github.com/users/octocat/repos",
      //       "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      //       "received_events_url": "https://api.github.com/users/octocat/received_events",
      //       "type": "User",
      //       "site_admin": false
      //     },
      //     "committer": {
      //       "login": "octocat",
      //       "id": 1,
      //       "node_id": "MDQ6VXNlcjE=",
      //       "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      //       "gravatar_id": "",
      //       "url": "https://api.github.com/users/octocat",
      //       "html_url": "https://github.com/octocat",
      //       "followers_url": "https://api.github.com/users/octocat/followers",
      //       "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      //       "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      //       "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      //       "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      //       "organizations_url": "https://api.github.com/users/octocat/orgs",
      //       "repos_url": "https://api.github.com/users/octocat/repos",
      //       "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      //       "received_events_url": "https://api.github.com/users/octocat/received_events",
      //       "type": "User",
      //       "site_admin": false
      //     },
      //     "parents": [
      //       {
      //         "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //         "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
      //       }
      //     ]
      //   },
      //   {
      //     "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //     "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //     "node_id": "MDY6Q29tbWl0NmRjYjA5YjViNTc4NzVmMzM0ZjYxYWViZWQ2OTVlMmU0MTkzZGI1ZQ==",
      //     "html_url": "https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //     "comments_url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e/comments",
      //     "commit": {
      //       "url": "https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //       "author": {
      //         "name": "Monalisa Octocat",
      //         "email": "support@github.com",
      //         "date": "2011-04-14T16:00:49Z"
      //       },
      //       "committer": {
      //         "name": "Monalisa Octocat",
      //         "email": "support@github.com",
      //         "date": "2011-04-14T16:00:49Z"
      //       },
      //       "message": "Fix all the bugs",
      //       "tree": {
      //         "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //         "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
      //       },
      //       "comment_count": 0,
      //       "verification": {
      //         "verified": false,
      //         "reason": "unsigned",
      //         "signature": null,
      //         "payload": null
      //       }
      //     },
      //     "author": {
      //       "login": "octocat",
      //       "id": 1,
      //       "node_id": "MDQ6VXNlcjE=",
      //       "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      //       "gravatar_id": "",
      //       "url": "https://api.github.com/users/octocat",
      //       "html_url": "https://github.com/octocat",
      //       "followers_url": "https://api.github.com/users/octocat/followers",
      //       "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      //       "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      //       "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      //       "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      //       "organizations_url": "https://api.github.com/users/octocat/orgs",
      //       "repos_url": "https://api.github.com/users/octocat/repos",
      //       "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      //       "received_events_url": "https://api.github.com/users/octocat/received_events",
      //       "type": "User",
      //       "site_admin": false
      //     },
      //     "committer": {
      //       "login": "octocat",
      //       "id": 1,
      //       "node_id": "MDQ6VXNlcjE=",
      //       "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      //       "gravatar_id": "",
      //       "url": "https://api.github.com/users/octocat",
      //       "html_url": "https://github.com/octocat",
      //       "followers_url": "https://api.github.com/users/octocat/followers",
      //       "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      //       "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      //       "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      //       "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      //       "organizations_url": "https://api.github.com/users/octocat/orgs",
      //       "repos_url": "https://api.github.com/users/octocat/repos",
      //       "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      //       "received_events_url": "https://api.github.com/users/octocat/received_events",
      //       "type": "User",
      //       "site_admin": false
      //     },
      //     "parents": [
      //       {
      //         "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //         "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
      //       }
      //     ]
      //   },
      //   {
      //     "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //     "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //     "node_id": "MDY6Q29tbWl0NmRjYjA5YjViNTc4NzVmMzM0ZjYxYWViZWQ2OTVlMmU0MTkzZGI1ZQ==",
      //     "html_url": "https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //     "comments_url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e/comments",
      //     "commit": {
      //       "url": "https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //       "author": {
      //         "name": "Monalisa Octocat",
      //         "email": "support@github.com",
      //         "date": "2011-04-14T16:00:49Z"
      //       },
      //       "committer": {
      //         "name": "Monalisa Octocat",
      //         "email": "support@github.com",
      //         "date": "2011-04-14T16:00:49Z"
      //       },
      //       "message": "Fix all the bugs",
      //       "tree": {
      //         "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //         "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
      //       },
      //       "comment_count": 0,
      //       "verification": {
      //         "verified": false,
      //         "reason": "unsigned",
      //         "signature": null,
      //         "payload": null
      //       }
      //     },
      //     "author": {
      //       "login": "octocat",
      //       "id": 1,
      //       "node_id": "MDQ6VXNlcjE=",
      //       "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      //       "gravatar_id": "",
      //       "url": "https://api.github.com/users/octocat",
      //       "html_url": "https://github.com/octocat",
      //       "followers_url": "https://api.github.com/users/octocat/followers",
      //       "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      //       "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      //       "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      //       "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      //       "organizations_url": "https://api.github.com/users/octocat/orgs",
      //       "repos_url": "https://api.github.com/users/octocat/repos",
      //       "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      //       "received_events_url": "https://api.github.com/users/octocat/received_events",
      //       "type": "User",
      //       "site_admin": false
      //     },
      //     "committer": {
      //       "login": "octocat",
      //       "id": 1,
      //       "node_id": "MDQ6VXNlcjE=",
      //       "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      //       "gravatar_id": "",
      //       "url": "https://api.github.com/users/octocat",
      //       "html_url": "https://github.com/octocat",
      //       "followers_url": "https://api.github.com/users/octocat/followers",
      //       "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      //       "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      //       "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      //       "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      //       "organizations_url": "https://api.github.com/users/octocat/orgs",
      //       "repos_url": "https://api.github.com/users/octocat/repos",
      //       "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      //       "received_events_url": "https://api.github.com/users/octocat/received_events",
      //       "type": "User",
      //       "site_admin": false
      //     },
      //     "parents": [
      //       {
      //         "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      //         "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
      //       }
      //     ]
      //   }
      // ];
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
