import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Logo.css';

class Logo extends Component {
  render() {
    return (
      <div className="logo">
      {
        (typeof web3 !== 'undefined') ?
        <h1>
          <a href="/SampleServices" title="Singularity">
            <span className="icon-logo"></span>
          </a>
        </h1>
        :
          <a href="/">
            <h1><span className="icon-logo"></span></h1>
          </a>
      }
      </div>
    );
  }
}

export default Logo;
