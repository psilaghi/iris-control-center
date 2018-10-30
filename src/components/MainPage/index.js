import * as React from 'react';
import NewRunPage from '../NewRunPage';
import RunsPage from '../RunsPage';
import AppHeader from '../AppHeader';


function MainPage (props) {
    return (
      <div>
        <AppHeader />
        <RunsPage />
        <NewRunPage />
      </div>
    )

}

export default MainPage;