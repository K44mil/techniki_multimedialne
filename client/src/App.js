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
import { loadUser, getDashboard } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';
import Notifications from './components/dashboard/Notifications';
import Tasks from './components/dashboard/Tasks';
import TaskProfile from './components/dashboard/TaskProfile';
import RateProfile from './components/dashboard/RateProfile';
import Chat from './components/shared/Chat';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getDashboard());
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
            <PrivateRoute
              exact
              path='/notifications'
              component={Notifications}
            />
            <PrivateRoute exact path='/tasks' component={Tasks} />
            <PrivateRoute exact path='/taskProfile' component={TaskProfile} />
            <PrivateRoute exact path='/rateProfile' component={RateProfile} />
            <PrivateRoute exact path='/chatRoom' component={Chat} />
          </Switch>
        </Provider>
      </Fragment>
    </Router>
  );
};

export default App;
