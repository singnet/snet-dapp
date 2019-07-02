import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

class CreatorDetails extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.creatorDetailsContainer}>
        <h3>Creator Details</h3>
        <div className={classes.companyInfo}>
          <img src="http://placehold.it/72x72" alt="" />
          <div className={classes.companyName}>
            <h4>Company Name</h4>
            <span>Main Author Details</span>
          </div>
        </div>
        <div className={classes.iconContainer}>
          <div className={classes.algoContainer}>
            <i className="far fa-file-alt"></i>
            <span>28 Algorithms</span>
          </div>
          <div className={classes.followContainer}>
            <i className="far fa-heart"></i>
            <span>Follow</span>
          </div>
          <div className={classes.contactContainer}>
            <i className="far fa-comment-alt"></i>
            <span>Contact</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(CreatorDetails);
