import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import CreateModelContainer from "./CreateModelContainer";
import ModelInfo from "./ModelInfo";
import Data from './Data';
import Payment from "./Payment";

const CreateModel = ({ classes }) => {
  const [activeSection, setActiveSection] = React.useState(1);

  const handleNextSection = () => {
    setActiveSection(activeSection + 1);
  };

  const createModelTabs = [
    {
      key: "modelInfo",
      component: <ModelInfo handleNextSection={handleNextSection} />,
    },
    {
      key: "data",
      component: <Data handleNextSection={handleNextSection} />,
    },
    {
      key: "payment",
      component: <Payment handleNextSection={handleNextSection} />
    },
    // {
    //   key: "finish",
    //   component: <Finish />
    // },
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
