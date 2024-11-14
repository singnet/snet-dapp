import React, { Fragment, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import CreateModelContainer from "./CreateModelContainer";
import ModelInfo from "./ModelInfo";
import Data from "./Data";
import Payment from "./Payment";
import Finish from "./Finish";
import Card from "../../../common/Card";

const CreateModel = ({ service, classes, training, modelDetailsOnEdit, cancelEditModel, updateModel, deleteModel }) => {
  const [activeSection, setActiveSection] = useState(1);
  const [modelData, setModelData] = useState({});
  const [trainModelId, setTrainModelId] = useState();
  const handleNextClick = () => {
    setActiveSection(activeSection + 1);
  };
  const onBackClick = () => {
    setActiveSection(activeSection - 1);
  };
  const createModelTabs = [
    {
      key: "modelInfo",
      component: (
        <ModelInfo
          handleNextClick={handleNextClick}
          training={training}
          setModelData={setModelData}
          modelDetailsOnEdit={modelDetailsOnEdit}
          cancelEditModel={cancelEditModel}
          updateModel={updateModel}
          deleteModel={deleteModel}
        />
      ),
    },
    {
      key: "data",
      component: (
        <Data
          handleNextClick={handleNextClick}
          onBackClick={onBackClick}
          modelData={modelData}
          setModelData={setModelData}
        />
      ),
    },
    {
      key: "payment",
      component: (
        <Payment
          handleNextClick={handleNextClick}
          service={service}
          modelData={modelData}
          setTrainModelId={setTrainModelId}
          setModelData={setModelData}
          modelDetailsOnEdit={modelDetailsOnEdit}
        />
      ),
    },
    {
      key: "finish",
      component: <Finish trainModelId={trainModelId} />,
    },
  ];

  const progressText = [{ label: "Model Info" }, { label: "Data" }, { label: "Payment" }, { label: "Finish" }];

  const CreateModelHeader = () => {
    if (isEmpty(modelDetailsOnEdit)) {
      return <h2>New Model Request</h2>;
    }

    return (
      <div className={classes.editModelHeader}>
        <h2>
          <span>Edit:</span> {modelDetailsOnEdit.modelName}
        </h2>
        <h2>
          <span>Model id:</span> {modelDetailsOnEdit.modelId}
        </h2>
      </div>
    );
  };

  return (
    <div className={classes.createModelContainer}>
      <Card
        header={CreateModelHeader()}
        children={
          <Fragment>
            {createModelTabs.map((item, index) => (
              <CreateModelContainer
                key={index.toString()}
                classes={classes}
                item={item}
                active={activeSection === index + 1}
                activeSection={activeSection}
                progressText={progressText}
              />
            ))}
          </Fragment>
        }
      />
    </div>
  );
};

export default withStyles(useStyles)(CreateModel);
