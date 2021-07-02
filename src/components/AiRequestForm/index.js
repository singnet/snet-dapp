import React, { Fragment } from "react";

import { withStyles } from "@material-ui/styles";

import Header from "./Header";
import { useStyles } from "./styles";

const AiRequestForm = ({ classes }) => {
  const headerTabs = [
    {
      title: "AI Marketplace",
      link: "https://beta.singularitynet.io/",
      newTab: false,
    },
    {
      title: "Singularity Studio",
      link: "https://singularity.studio/",
      newTab: true,
    },
  ];
  return (
    <Fragment>
      <Header data={headerTabs} />
      <div className={classes.aiRequestFormMainContainer}>
        <div className={classes.aiRequestFormWrapper}>
          <h2>Looking for New AI Service?</h2>
          <span>Please fill in this form and we will contact you shortly.</span>
          <div className={classes.formContainer}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSeJHI_TCmw0XufpzuqpXTfGrX0vULiwjhJY_361zVC79xCTYA/viewform?embedded=true"
              width="100%"
              height="1165"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
              title="AI Request Form"
            >
              Loading…
            </iframe>
          </div>
          <div className={classes.aiRequestFormFooterContainer}>
            <p>
              We value your privacy. We won't disclose your personal information for any purpose unless you consent to
              it.
            </p>
            <p>Copyright © 2021 SingularityNET All rights reserved. </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withStyles(useStyles)(AiRequestForm);
