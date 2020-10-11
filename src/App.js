import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Sign from './layouts/Sign';
import Default from './layouts/Default';
import { setUserConnected } from './store/src/user'
import sdk from './sdk';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import RegisterConfirmation from './pages/RegisterConfirmation';
import jwt from 'jsonwebtoken';

function RouteWrapper({component: Component, layout: Layout, ...rest}) {
  return (
    <Route {...rest} render={(props) =>
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    } />
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      sdk.setToken(token);
      dispatch(setUserConnected(jwt.decode(token)));
    }
  }, []);

  return (
    <div>
      <Router>
        <div>
          <Switch>
            <RouteWrapper exact path="/login" component={Login} layout={Sign}/>
            <RouteWrapper exact path="/register" component={Register} layout={Sign} />
            <RouteWrapper exact path="/register/confirm" component={RegisterConfirmation} layout={Sign} />
            <RouteWrapper exact path="/" component={Home} layout={Default} />
            <RouteWrapper exact path="/profile" component={Profile} layout={Default} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
