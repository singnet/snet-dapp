import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import StyledButton from "../../common/StyledButton";

import { useStyles } from "./styles";
import ExistingModel from "../ExistingModel";
import ProjectDetails from "../ProjectDetails";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CreateModel from "./CreateModel";

const TrainingModels = ({ classes, service, haveANewModel, training }) => {
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [MMconnected] = useState(true);

  const handleRequestModel = () => {
    setShowCreateModel(true);
  };

  if (!MMconnected) {
    return (
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.leftSideSection}>
        <ExistingModel showReqNewModelBtn haveANewModel={haveANewModel} training={training} />
      </Grid>
    );
  }

  return (
    <Grid container spacing={24} className={classes.trainingModelContainer}>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.leftSideSection}>
        {showCreateModel ? (
          <CreateModel />
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
              {/* {haveANewModel ? <StyledButton btnText="request a new model" onClick={handleRequestModel} /> : null} */}
              <StyledButton btnText="request a new model" onClick={handleRequestModel} />
            </div>
            <ExistingModel showReqNewModelBtn haveANewModel={haveANewModel} training={training} />
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
