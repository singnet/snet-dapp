import React, { useCallback, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import StyledButton from "../../common/StyledButton";

import { useStyles } from "./styles";
import ExistingModel from "../ExistingModel";
import ProjectDetails from "../ProjectDetails";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CreateModel from "./CreateModel";

const TrainingModels = ({ classes, service, training }) => {
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
        />
      );
    }
    return null;
  }, [training]);

  return (
    <Grid container spacing={24} className={classes.trainingModelContainer}>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.leftSideSection}>
        {showCreateModel ? (
          <CreateModel service={service} training={training} />
        ) : (
          <>
            <div className={classes.requestModelContainer}>
              <h2>Request a new model</h2>
              <div>
                <InfoOutlinedIcon />
                <p>
                  The first step in requesting a custom model is to create a project. A project is where you can create
                  and manage models. The models you create in this project inherit the name of the project.
                </p>
              </div>
              <StyledButton btnText="request a new model" onClick={handleRequestModel} />
            </div>
            <RenderExistingModel />
          </>
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
