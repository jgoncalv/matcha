import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';

import CircularProgress from '@material-ui/core/CircularProgress';

import Sign from './layouts/Sign';
import Default from './layouts/Default';
import { fetchUserProfile, setUserConnected } from './store/src/user';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate';
import RegisterConfirmation from './pages/RegisterConfirmation';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import sdk from './sdk';

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
  const username = useSelector(state => state.user.username);
  const fetchStatus = useSelector(state => state.user.fetchStatus);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      sdk.setToken(token);
      dispatch(setUserConnected(jwt.decode(token)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (username) {
      dispatch(fetchUserProfile({ username }));
    }
  }, [dispatch, username])

  if (['loading', 'idle'].includes(fetchStatus)) {
    return <CircularProgress color="secondary" />
  }

  return (
    <div>
      <Router>
        <div>
          <Switch>
            <RouteWrapper exact path="/login" component={Login} layout={Sign}/>
            <RouteWrapper exact path="/register" component={Register} layout={Sign} />
            <RouteWrapper exact path="/register/confirm" component={RegisterConfirmation} layout={Sign} />
            <RouteWrapper exact path="/" component={Home} layout={Default} />
            <RouteWrapper exact path="/profile/:username" component={Profile} layout={Default} />
            <RouteWrapper exact path={`/profile/${username}/update`} component={ProfileUpdate} layout={Default} />
            <RouteWrapper exact path="/settings" component={Settings} layout={Default} />
            <RouteWrapper exact path="/search" component={Search} layout={Default} />
            <Route exact path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
