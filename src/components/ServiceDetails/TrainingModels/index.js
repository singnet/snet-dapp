import React, { Fragment, useCallback, useState } from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import StyledButton from "../../common/StyledButton";

import { useStyles } from "./styles";
import ExistingModel from "../ExistingModel";
import ProjectDetails from "../ProjectDetails";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CreateModel from "./CreateModel";
import Card from "../../common/Card";

const TrainingModels = (props) => {
  const {
    classes,
    service,
    training,
    createModelCalled,
    modelDetailsOnEdit,
    cancelEditModel,
    updateModel,
    editModel,
    deleteModel,
  } = props;
  const [showCreateModel, setShowCreateModel] = useState(false);
  const handleRequestModel = () => {
    setShowCreateModel(true);
  };

  const RenderExistingModel = useCallback(() => {
    if (process.env.REACT_APP_TRAINING_ENABLE === "true" && Object.keys(training).length) {
      return (
        <ExistingModel
          showReqNewModelBtn
          haveANewModel={training?.training_methods?.length || false}
          training={training}
          editModel={editModel}
        />
      );
    }
    return null;
  }, [editModel, training]);

  if (createModelCalled === "edit") {
    return (
      <Grid container className={classes.trainingModelContainer}>
        <Grid item xs={12} sm={12} md={8} lg={8} className={classes.leftSideSection}>
          <CreateModel
            service={service}
            training={training}
            modelDetailsOnEdit={modelDetailsOnEdit}
            cancelEditModel={cancelEditModel}
            updateModel={updateModel}
            deleteModel={deleteModel}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} className={classes.rightSideSection}>
          <ProjectDetails
            projectURL={service.url}
            contributors={service.contributors}
            orgId={service.org_id}
            serviceId={service.service_id}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} className={classes.trainingModelContainer}>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.leftSideSection}>
        {showCreateModel ? (
          <CreateModel service={service} training={training} />
        ) : (
          <Fragment>
            <Card
              header="Request a new model"
              children={
                <div className={classes.requestModelInfoHolder}>
                  <div className={classes.requestModelInfo}>
                    <InfoOutlinedIcon />
                    <p>
                      The first step in requesting a custom model is to create a project. A project is where you can
                      create and manage models. The models you create in this project inherit the name of the project.
                    </p>
                  </div>
                  <span>
                    <StyledButton btnText="request a new model" onClick={handleRequestModel} />
                  </span>
                </div>
              }
            />
            <RenderExistingModel />
          </Fragment>
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} className={classes.rightSideSection}>
        <ProjectDetails
          projectURL={service.url}
          contributors={service.contributors}
          orgId={service.org_id}
          serviceId={service.service_id}
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(TrainingModels);
