import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import MyRunsPage from './components/MyRunsPage';
import StartNewRunPage from './components/StartNewRunPage';
import AppHeader from './components/AppHeader';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <AppHeader />
          <Switch>
            <Redirect exact={true} from="/" to="/myruns" />
            <Route path="/myruns" component={MyRunsPage} />
            <Route path="/startnewrun" component={StartNewRunPage} />
            <Redirect to="/myruns" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
