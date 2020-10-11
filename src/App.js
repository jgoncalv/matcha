import React from 'react';
import { useSelector } from 'react-redux';

import Sign from './layouts/Sign';
import Default from './layouts/Default';

function App() {
  const isConnected = useSelector(state => state.user.isConnected);

  return (
    <div>
      {isConnected ? <Default/> : <Sign/>}
    </div>
  );
}

export default App;
