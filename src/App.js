import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import RunsPage from './components/RunsPage';
import NewRunPage from './components/NewRunPage';
import RunDetailsPage from './components/RunDetailsPage';
import AppHeader from './components/AppHeader';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <AppHeader />
          <Switch>
            <Redirect exact={true} from="/" to="/runs" />
            <Route path="/runs" exact component={RunsPage} />
            <Route path="/runs/new" exact component={NewRunPage} />
            <Route path="/runs/:id" component={RunDetailsPage} />
            <Redirect to="/runs" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
