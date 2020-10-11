import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return <div>
    You are not connected.<br/>
    Go to the <Link to="/login">Login page</Link>
  </div>
}
