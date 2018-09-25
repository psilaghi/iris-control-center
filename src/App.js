import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import MainPage from './components/MainPage';
import RunDetailsPage from './components/RunDetailsPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Redirect exact={true} from="/" to="/index" />
            <Route path="/index" exact component={MainPage} />
            <Route path="/runs/:id" component={RunDetailsPage} />
            <Redirect to="/index" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
