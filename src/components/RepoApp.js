import React from "react";

import RepoPage from "./RepoPage";
import SearchForm from "./SearchForm";
import RepoList from "./RepoList";

// interface Props {
//   
// }

// interface State {
//   repoId: string
// }

export default class RepoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repoId: null
    }
  }

  render() {
    const { repoId } = this.state;

    return (
      <div className="repo-app">
        {/* {repoId ? (
            <RepoPage id={repoId} />
          ) : (
            <>
              <SearchForm />
              <RepoList />
            </>
          )
        } */}
      </div>
    )
  }
}
