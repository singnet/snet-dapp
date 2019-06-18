import React, { Component } from 'react';

// Material UI imports
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
	footerRightSideLinks: {
		display: 'flex',
    padding: '35px 0 0 35px',
    justifyContent: 'space-between',
    width: '100%'
	},
	footerLinksList: {
		padding: 0,
		margin: 0
	},
	footerLinks: {
		listStyle: 'none'
	},
	footerLinkText: {
		color: 'rgba(255,255,255,.60)',
		textDecoration: 'none',
		lineHeight: '25px'
	},
	footerLinksTitle: {
		marginBottom: 15,
		display: 'inline-block',
		fontSize: 20,
		fontWeight: 600,
	},
	marginLeft: {
		marginLeft: 35
	}
}))

function FooterLinks () {
	const classes = useStyles();
  return (
    <div className={classes.footerRightSideLinks}>
    	<ul className={classes.footerLinksList}>
        <span className={classes.footerLinksTitle}>Quick Links</span>	        
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="Getting Started">Getting Started</a></li>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="Beta Marketplace">Beta Marketplace</a></li>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="AGI Faucet">AGI Faucet</a></li>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="Terminology">Terminology</a></li>
      </ul>
      <ul className={classes.footerLinksList}>          
        <span className={classes.footerLinksTitle}>Docs</span>
      	<li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="Core Concepts">Core Concepts</a></li>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="Guides">Guides</a></li>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="Platforms">Platforms</a></li>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="AI Provider">AI Provider</a></li>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="AI Buyer">AI Buyer</a></li>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="AI Library">AI Library</a></li>          
      </ul>
      <ul className={classes.footerLinksList}> 
        <span className={classes.footerLinksTitle}>Resources</span>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="Datasets">Datasets</a></li>
      </ul>
      <ul className={classes.footerLinksList}>
        <span className={classes.footerLinksTitle}>Community</span>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="Forum">Forum</a></li>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="Blog">Blog</a></li>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="Request AI">Request AI</a></li>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="Bounty Rewards">Bounty Rewards</a></li>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="Contribute Program">Contribute Program</a></li>
      </ul>
      <ul className={classes.footerLinksList}>
        <span className={classes.footerLinksTitle}>More</span>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="Changelog">Changelog</a></li>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="SNET signup">SNET signup</a></li>
        <li className={classes.footerLinks}><a href="#" className={classes.footerLinkText} title="Login">Login</a></li>
      </ul>
    </div>
  );
}

export default FooterLinks;
