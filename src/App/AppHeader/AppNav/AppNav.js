import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './AppNav.css';

class AppNav extends Component {

  constructor(props){
    super(props);

    this.state = { showHamburgerMenu: false }

    this.handleshowHamburgerMenu = this.handleshowHamburgerMenu.bind(this);
  }

  handleshowHamburgerMenu(){
    this.setState({
      showHamburgerMenu: !this.state.showHamburgerMenu
    })
  }

  render() {

    console.log(this.state.showHamburgerMenu)
    const menuList = 
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="#">AGI Faucet</Link></li>
        <li className="get-started"><Link to="/GetStarted" target="_blank">Get Started</Link></li>
      </ul>

    return (
      <nav>
        <div className="col-md-12 header-menu">
          {menuList}
        </div>
        <div className="col-md-12 hamburger">
          <button className="bars" onClick={this.handleshowHamburgerMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          {
            this.state.showHamburgerMenu ?
              <div className="mobile-menu">
                {menuList}
              </div>
            :
              null
          }
        </div>
      </nav>
    );
  }
}

export default AppNav;
