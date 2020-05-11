import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/shared/Landing';
import Navbar from './components/shared/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/shared/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Groups from './components/dashboard/Groups';
import GroupProfile from './components/dashboard/GroupProfile';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Fragment>
        <Provider store={store}>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/groups' component={Groups} />
            <PrivateRoute exact path='/groupProfile' component={GroupProfile} />
          </Switch>
        </Provider>
      </Fragment>
    </Router>
  );
};

export default App;
