import React, { useState } from "react";
import { useSelector } from "react-redux";

import isEmpty from "lodash/isEmpty";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
// import CreateModelContainer from "./CreateModelContainer";
import ModelInfo from "./ModelInfo";
// import Payment from "./Payment";
// import Finish from "./Finish";
import Card from "../../../common/Card";

const EditModel = ({ classes, cancelEditModel }) => {
  const { modelId, modelName } = useSelector((state) => state.serviceTrainingReducer);

  const [activeSection, setActiveSection] = useState(1);

  const handleNextClick = () => {
    setActiveSection(activeSection + 1);
  };

  // const onBackClick = () => {
  //   setActiveSection(activeSection - 1);
  // };

  // const createModelTabs = [
  //   {
  //     key: "modelInfo",
  //     component: <ModelInfo handleNextClick={handleNextClick} cancelEditModel={cancelEditModel} />,
  //   },
  //   // {
  //   //   key: "payment",
  //   //   component: <Payment handleNextClick={handleNextClick} />,
  //   // },
  //   // {
  //   //   key: "finish",
  //   //   component: <Finish />,
  //   // },
  // ];

  // const progressText = [{ label: "Model Info" }, { label: "Finish" }];

  const CreateModelHeader = () => {
    if (isEmpty(modelId)) {
      return "New Model Request";
    }

    return (
      <div className={classes.editModelHeader}>
        <h2>
          <span>Edit:</span> {modelName}
        </h2>
        <h2>
          <span>Model id:</span> {modelId}
        </h2>
      </div>
    );
  };

  return (
    <div className={classes.createModelContainer}>
      <Card
        header={CreateModelHeader()}
        children={<ModelInfo handleNextClick={handleNextClick} cancelEditModel={cancelEditModel} />}
        // <Fragment>
        //   {createModelTabs.map((item, index) => (
        //     <CreateModelContainer
        //       key={index.toString()}
        //       classes={classes}
        //       item={item}
        //       active={activeSection === index + 1}
        //       activeSection={activeSection}
        //       progressText={progressText}
        //     />
        //   ))}
        // </Fragment>
      />
    </div>
  );
};

export default withStyles(useStyles)(EditModel);
