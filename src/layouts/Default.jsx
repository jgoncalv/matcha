import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import YouNeedToBeConnected from '../components/YouNeedToBeConnected';
import { fetchUserProfile } from '../store/src/user';

export default ({ children }) => {
  const isConnected = useSelector(state => state.user.isConnected);
  const username = useSelector(state => state.user.username);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchUserProfile({ username }))
    }
  }, [isConnected])

  return <div>{isConnected ? children : <YouNeedToBeConnected />}</div>;
};
