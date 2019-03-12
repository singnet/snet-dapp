import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import './AppNav.css';

class AppNav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/account">Account</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="#">AGI Faucet</Link></li>
          <li className="get-started"><Link to="/GetStarted" target="_blank">Get Started</Link></li>
        </ul>
      </nav>
    );
  }
}

export default AppNav;
