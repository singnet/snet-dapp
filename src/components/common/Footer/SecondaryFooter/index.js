import React from "react";
import Grid from "@material-ui/core/Grid";

import { useStyles } from "./styles";

const SecondaryFooter = () => {
    const classes = useStyles();
    return (
        <Grid container spacing={24} className={classes.secondaryFooter}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
                <p className={classes.copyrightText}>Copyright © 2019 SingularityNET All rights reserved.</p>
                <p className={classes.copyrightText}>
                    Stichting SingularityNET Barbara Strozzilaan 362 1083 HN Amsterdam The Netherlands
                </p>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
                <ul className={classes.socialIconsList}>
                    <li className={classes.socialIconsLink}>
                        <a href="#" title="Facebook" className={classes.socialIcon}>
                            <i className="fab fa-facebook-f"></i>
                        </a>
                    </li>
                    <li className={classes.socialIconsLink}>
                        <a href="#" title="Linkedin" className={classes.socialIcon}>
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </li>
                    <li className={classes.socialIconsLink}>
                        <a href="#" title="Github" className={classes.socialIcon}>
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                    <li className={classes.socialIconsLink}>
                        <a href="#" title="Twitter" className={classes.socialIcon}>
                            <i className="fab fa-twitter"></i>
                        </a>
                    </li>
                    <li className={classes.socialIconsLink}>
                        <a href="#" title="Instagram" className={classes.socialIcon}>
                            <i className="fab fa-instagram"></i>
                        </a>
                    </li>
                    <li className={classes.socialIconsLink}>
                        <a href="#" title="Youtube" className={classes.socialIcon}>
                            <i className="fab fa-youtube"></i>
                        </a>
                    </li>
                    <li className={classes.socialIconsLink}>
                        <a href="#" title="Youtube" className={classes.socialIcon}>
                            <i className="far fa-envelope"></i>
                        </a>
                    </li>
                </ul>
            </Grid>
        </Grid>
    );
};

export default SecondaryFooter;
