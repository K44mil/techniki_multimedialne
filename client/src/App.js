import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Navbar, Landing, Register, Login } from './components';
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Router>
    <Provider store={store}>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section className='container'>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </section>
    </Provider>
  </Router>
);

export default App;
