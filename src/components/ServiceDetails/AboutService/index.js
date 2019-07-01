import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import StyledButton from "../../common/StyledButton";
import StyledGallery from "./StyledGallery";
import { useStyles } from "./styles";

class AboutService extends Component {
    state = {};

    render() {
        const { classes } = this.props;

        return (
            <Grid container spacing={24} className={classes.aboutContainer}>
                <Grid item xs={12} sm={12} md={8} lg={8} className={classes.leftSideSection}>
                    <div className={classes.overViewContainer}>
                        <h3>Overview</h3>
                        <p>
                            Colorizes given black & white images. Input a black & white photo and let the AI comput the
                            predicted color states of the original photo image.
                        </p>
                        <h4>Features</h4>
                        <p>
                            Lorem ipsum dolor sit amet, vix ut facer cetero meliore, an nibh veri adhuc duo. Ad mei
                            facete detraxit, ad error cotidieque sea, pri graeci impetus efficiendi cu. Sea ei feugiat
                            appareat pertinax, mei alii periculis ad, stet officiis sit cu.
                        </p>
                        <ul>
                            <div>
                                <li>Fully responsive</li>
                                <li>Touch enabled</li>
                                <li>Animated Layers</li>
                                <li>Per-slide options</li>
                            </div>
                            <div>
                                <li>Mobile optimized</li>
                                <li>More than 30 options</li>
                                <li>Literally unlimited transitions</li>
                                <li>Easy installation</li>
                            </div>
                        </ul>
                        <div className={classes.tagsContainer}>
                            <h5>Tags</h5>
                            <span className={classes.tags}>Tag Name</span>
                            <span className={classes.tags}>Tag Name</span>
                            <span className={classes.tags}>Tag Name</span>
                        </div>
                    </div>

                    <div className={classes.demoContainer}>
                        <h3>Demo Example</h3>
                        <div>
                            <StyledButton btnText="login" type="transparent" />
                            <StyledButton btnText="signup and run for free" />
                        </div>
                    </div>

                    <div className={classes.backToLink}>
                        <i className="fas fa-arrow-left"></i>
                        <a href="#" title="Back To">
                            Back to AI Marketplace
                        </a>
                    </div>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4}>
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

                    <div className={classes.projectDetailsContainer}>
                        <h3>Project Details</h3>
                        <div>
                            <h5>Project URL</h5>
                            <a href="#" alt="URL">
                                singnet.github.io/time-s…
                            </a>
                        </div>
                        <div>
                            <h5>Latest Version</h5>
                            <p>
                                <a href="#" alt="Version">
                                    v1.1.0
                                </a>
                                (last updated 2019-23-04)
                            </p>
                        </div>
                        <div>
                            <h5>License type</h5>
                            <a href="#" alt="Type">
                                CC BY 4.0
                            </a>
                        </div>
                        <div className={classes.contributors}>
                            <h5>Contributors</h5>
                            <p>Bolei Zhou, Hang Zhao, Xavier Puig, Tete Xiao, Sanja Fidler</p>
                        </div>
                    </div>

                    <StyledGallery />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(useStyles)(AboutService);
