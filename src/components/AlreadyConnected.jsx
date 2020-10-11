import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return <div>
    You are already connected.<br/>
    Go to the <Link to="/">Home page</Link>
  </div>
}
