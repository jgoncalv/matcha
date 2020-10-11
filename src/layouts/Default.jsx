import React from 'react';
import { useSelector } from 'react-redux';

import YouNeedToBeConnected from '../components/YouNeedToBeConnected';

export default () => {
  const isConnected = useSelector(state => state.user.isConnected);

  if (!isConnected) {
    return <YouNeedToBeConnected />
  }

  return <div>hjello</div>;
};
