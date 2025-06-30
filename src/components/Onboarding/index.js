import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { withStyles } from "@mui/styles";
import Authentication from "./Authentication";
import TermsOfUse from "./TermsOfUse";
import { useStyles } from "./styles";
import OnboardingContainer from "./OnboardingContainer";

const Onboarding = ({ classes }) => {
  const navigate = useNavigate();

  const isEmailVerified = useSelector((state) => state.userReducer.isEmailVerified);
  const nickname = useSelector((state) => state.userReducer.nickname);

  const [activeSection, setActiveSection] = useState(0);
  const progressText = [{ label: "Authentication" }, { label: "Terms of service" }];

  useEffect(() => {
    if (isEmailVerified) {
      setActiveSection(1);
    }
  }, [navigate, isEmailVerified]);

  const handleNextSection = () => {
    setActiveSection(activeSection + 1);
  };

  const OnboardingDetails = [
    {
      title: `Welcome ${nickname}`,
      description: (
        <p>
          You have successfully logged into your singularitynet account. <br />
          You are just steps away from completing your activation.
        </p>
      ),
      component: <Authentication handleNextSection={handleNextSection} />,
    },
    {
      title: `Step 2. Privacy and Terms of Service`,
      description: <p>Just one more step and you’ll be all set!</p>,
      component: <TermsOfUse />,
    },
  ];

  return (
    <div className={classes.onboardingContainer}>
      <Helmet>
        <meta
          name="description"
          content="Begin your journey into the AI Marketplace with SingularityNET. Access a world of AI services and solutions today."
        />
        <meta name="keywords" content="AI Marketplace, Onboarding, SingularityNET, AI Services, Get Started" />
      </Helmet>
      {OnboardingDetails.map((item, index) => (
        <OnboardingContainer
          key={item.title}
          classes={classes}
          item={item}
          active={activeSection === index}
          activeSection={activeSection}
          progressText={progressText}
        />
      ))}
    </div>
  );
};

export default withStyles(useStyles)(Onboarding);
