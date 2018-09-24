import * as React from 'react';
import NewRunPage from '../NewRunPage';
import RunsPage from '../RunsPage';


function MainPage (props) {
    return (
      <div>
        <RunsPage />
        <NewRunPage />
      </div>
    )

}

export default MainPage;