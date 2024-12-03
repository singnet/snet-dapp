import React, { Fragment, useState } from "react";

import Grid from "@mui/material/Grid";
import StyledButton from "../../common/StyledButton";
import CreateModel from "./CreateModel";
import Card from "../../common/Card";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

import ExistingModel from "../ExistingModel";
import ProjectDetails from "../ProjectDetails";
import { useDispatch } from "react-redux";
import { resetCurrentModelDetails } from "../../../Redux/actionCreators/ServiceTrainingActions";
import { useLocation } from "react-router-dom";

const TrainingModels = ({ classes, service }) => {
  const { state } = useLocation();

  const [showCreateModel, setShowCreateModel] = useState(
    state?.isOpenCreatingModel ? state?.isOpenCreatingModel : false
  );
  const dispatch = useDispatch();

  const openEditModelSection = () => {
    setShowCreateModel(true);
  };

  const closeEditModelSection = () => {
    setShowCreateModel(false);
  };

  const cancelEditModel = () => {
    closeEditModelSection();
  };

  const createNewModel = () => {
    dispatch(resetCurrentModelDetails());
    openEditModelSection();
  };

  const RequestNewModelCard = () => {
    return (
      <Card
        header="Request a new model"
        children={
          <div className={classes.requestModelInfoHolder}>
            <div className={classes.requestModelInfo}>
              <InfoOutlinedIcon />
              <p>
                The first step in requesting a custom model is to create a project. A project is where you can create
                and manage models. The models you create in this project inherit the name of the project.
              </p>
            </div>
            <span>
              <StyledButton btnText="request a new model" onClick={createNewModel} />
            </span>
          </div>
        }
      />
    );
  };

  return (
    <Grid container spacing={3} className={classes.trainingModelContainer}>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.leftSideSection}>
        {showCreateModel ? (
          <CreateModel service={service} cancelEditModel={cancelEditModel} />
        ) : (
          <Fragment>
            <RequestNewModelCard />
            <ExistingModel openEditModel={openEditModelSection} />
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
