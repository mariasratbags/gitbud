import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div>
      <ul>
        <li><Link to='/'>Landing Page</Link></li>
        <li><Link to='/user'>MyAccount</Link></li>
        <li><Link to='/projects'>Projects</Link></li>
      </ul>
    </div>
  );
}

export default Nav;
