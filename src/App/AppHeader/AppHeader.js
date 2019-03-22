import React, { Component } from 'react';

import AppNav from "./AppNav/AppNav";
import Logo from "../common/Logo/Logo";

import Grid from "@material-ui/core/Grid";

import "./AppHeader.css";

class AppHeader extends Component {
  render() {
    return (
      <header>
      	<div className="header">

          <div id="roadmap-row" data-midnight="light" data-bg-mobile-hidden="" className="wpb_row vc_row-fluid vc_row full-width-section standard_section" style={{ visibility: "visible"}} data-top-percent="4%" data-bottom-percent="4%">

          	<div className="row-bg-wrap instance-2">
              <div className="inner-wrap"> 
                <div className="row-bg" data-color_overlay="#40ceff" data-color_overlay_2="#5a2ff1" data-gradient_direction="left_to_right" data-overlay_strength="1" data-enable_gradient="true">
                </div>
              </div> 
            </div>

            <div className="nectar-shape-divider-wrap no-color" data-front="" data-style="mountains" data-position="bottom">
              <svg className="nectar-shape-divider" fill="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 300" preserveAspectRatio="none">  
                <path d="M 1014 264 v 122 h -808 l -172 -86 s 310.42 -22.84 402 -79 c 106 -65 154 -61 268 -12 c 107 46 195.11 5.94 275 137 z"></path>   
                <path d="M -302 55 s 235.27 208.25 352 159 c 128 -54 233 -98 303 -73 c 92.68 33.1 181.28 115.19 235 108 c 104.9 -14 176.52 -173.06 267 -118 c 85.61 52.09 145 123 145 123 v 74 l -1306 10 z"></path>  
                <path d="M -286 255 s 214 -103 338 -129 s 203 29 384 101 c 145.57 57.91 178.7 50.79 272 0 c 79 -43 301 -224 385 -63 c 53 101.63 -62 129 -62 129 l -107 84 l -1212 12 z"></path>  
                <path d="M -24 69 s 299.68 301.66 413 245 c 8 -4 233 2 284 42 c 17.47 13.7 172 -132 217 -174 c 54.8 -51.15 128 -90 188 -39 c 76.12 64.7 118 99 118 99 l -12 132 l -1212 12 z"></path>  
                <path d="M -12 201 s 70 83 194 57 s 160.29 -36.77 274 6 c 109 41 184.82 24.36 265 -15 c 55 -27 116.5 -57.69 214 4 c 49 31 95 26 95 26 l -6 151 l -1036 10 z"></path> 
               </svg>
            </div>

            
            <div className="header-elements">
              <Grid container className="desktop-view-header">
                <Grid item xs={5} sm={5} md={3} lg={4}>
                  <Logo />
                </Grid>
                <Grid item  sm={4} md={3} lg={3} className="network-name-container">
                  <div className="network-name">
                    <span>Ropsten Test Network</span>
                  </div>
                </Grid>
                <Grid item className="navigation-links" xs={7} sm={3} md={6} lg={5}>
                  <AppNav />
                </Grid>
              </Grid>
              <Grid container className="mobile-view-header">
                <Grid item xs={12} sm={12} md={12} lg={12} className="network-name-container">
                  <div className="network-name">
                    <span>Ropsten Test Network</span>
                  </div>
                </Grid>
              </Grid>
            </div>
          
          </div>

        </div>      	
      </header>
    );
  }
}

export default AppHeader;
