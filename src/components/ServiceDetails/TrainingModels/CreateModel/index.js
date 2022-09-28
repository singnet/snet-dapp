import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import CreateModelContainer from "./CreateModelContainer";
import ModelInfo from "./ModelInfo";
import Data from "./Data";
import Payment from "./Payment";
import Finish from "./Finish";

const CreateModel = ({ service, classes, training }) => {
  const [activeSection, setActiveSection] = React.useState(1);
  const [trainingDataLink, setTrainingDataLink] = useState("");

  const handleNextClick = () => {
    setActiveSection(activeSection + 1);
  };

  const onBackClick = () => {
    setActiveSection(activeSection - 1);
  };

  const createModelTabs = [
    {
      key: "modelInfo",
      component: <ModelInfo handleNextClick={handleNextClick} training={training} />,
    },
    {
      key: "data",
      component: (
        <Data
          handleNextClick={handleNextClick}
          onBackClick={onBackClick}
          trainingDataLink={trainingDataLink}
          setTrainingDataLink={setTrainingDataLink}
        />
      ),
    },
    {
      key: "payment",
      component: <Payment handleNextClick={handleNextClick} service={service} />,
    },
    {
      key: "finish",
      component: <Finish />,
    },
  ];

  const progressText = [{ label: "Model Info" }, { label: "Data" }, { label: "Payment" }, { label: "Finish" }];

  return (
    <div className={classes.createModelContainer}>
      <h2>New Model Request</h2>
      {createModelTabs.map((item, index) => (
        <CreateModelContainer
          key={item.title}
          classes={classes}
          item={item}
          active={activeSection === index + 1}
          activeSection={activeSection}
          progressText={progressText}
        />
      ))}
    </div>
  );
};

export default withStyles(useStyles)(CreateModel);
