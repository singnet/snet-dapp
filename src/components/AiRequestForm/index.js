import React, { useEffect, useState } from "react";

import { withStyles } from "@mui/styles";

import Header from "./Header";
import { useStyles } from "./styles";
import Routes from "../../utility/constants/Routes";
import { Helmet } from "react-helmet";

const AiRequestForm = ({ classes }) => {
  const [fixHeader, setfixHeader] = useState(false);

  const headerTabs = [
    {
      title: "AI Marketplace",
      link: `/${Routes.AI_MARKETPLACE}`,
      newTab: false,
    },
  ];

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setfixHeader(true);
      } else {
        setfixHeader(false);
      }
    });
    return () => {
      // eslint-disable-next-line no-empty-function
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const onIframeLoad = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={classes.googleFormMainContainer}>
      <Helmet>
        <meta
          name="description"
          content="Have an AI project in mind? Submit your request through SingularityNET and collaborate with leading AI experts."
        />
      </Helmet>
      <Header data={headerTabs} fixHeader={fixHeader} />
      <div className={classes.aiRequestFormMainContainer}>
        <div className={classes.aiRequestFormWrapper}>
          <h2>Looking for New AI Service?</h2>
          <span>Please fill in this form and we will contact you shortly.</span>
          <div className={classes.formContainer}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSeJHI_TCmw0XufpzuqpXTfGrX0vULiwjhJY_361zVC79xCTYA/viewform?embedded=true"
              width="100%"
              height="1350"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
              title="AI Request Form"
              onLoad={onIframeLoad}
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
    </div>
  );
};

export default withStyles(useStyles)(AiRequestForm);
