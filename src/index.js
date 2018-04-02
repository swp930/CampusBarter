import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './components/Login'
import { Router, Switch } from 'react-router-dom'
import history from './history'
import Auth from './Auth'

ReactDOM.render(
  <Router history={history}>
    {!Auth.isUserAuthenticated() ? <App currentUser="Harsh Karia"/> : <Login />}
  </Router>
  , document.getElementById('root'));
