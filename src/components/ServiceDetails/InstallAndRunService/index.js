import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import Web3 from "web3";

import StyledTabs from "../StyledTabs";
import Python from "./Python";
import Nodejs from "./Nodejs";
import ProjectDetails from "../ProjectDetails";
import { useStyles } from "./styles";
import { serviceActions } from "../../../Redux/actionCreators";
import AlertBox, { alertTypes } from "snet-dapp-components/components/AlertBox";

const web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER, null, {});
const downloadTokenFileName = "authToken.txt";

class InstallAndRunService extends Component {
  state = {
    activeTab: 0,
    publickey: "",
    downloadTokenURL: "",
    alert: {},
  };

  handleTabChange = (activeTab) => {
    this.setState({ activeTab, alert: {}, downloadTokenURL: "" });
  };

  generateToken = async (e) => {
    e.preventDefault();
    try {
      this.setState({ alert: {}, downloadTokenURL: "" });
      if (web3.utils.isAddress(this.state.publickey)) {
        const { service, groupId, downloadAuthToken } = this.props;
        const downloadTokenURL = await downloadAuthToken(
          service.service_id,
          groupId,
          this.state.publickey,
          service.org_id
        );
        this.setState({ downloadTokenURL });
      } else {
        this.setState({ alert: { type: alertTypes.ERROR, message: "invalid public key" } });
      }
    } catch (e) {
      this.setState({ alert: { type: alertTypes.ERROR, message: "Unable to download the token. Please try later" } });
    }
  };

  handlePublicKey = (event) => {
    this.setState({ publickey: event.currentTarget.value, alert: {}, downloadTokenURL: "" });
  };

  render() {
    const { classes, service } = this.props;
    const { activeTab, downloadTokenURL, alert } = this.state;
    const tabs = [
      {
        name: "Python",
        activeIndex: 0,
        component: (
          <Python
            description="Download the Python SDK to help you integrate this AI service with your application. Once you setup your configuration, use the token generator below to test the servcie with a number of free calls."
            orgId={service.org_id}
            serviceId={service.service_id}
          />
        ),
      },
      {
        name: "Nodejs",
        activeIndex: 1,
        component: (
          <Nodejs description="Download the Nodejs SDK to help you integrate this AI service with your application. Once you setup your configuration, use the token generator below to test the servcie with a number of free calls." />
        ),
      },
      // {
      //   name: "Javascript",
      //   activeIndex: 2,
      //   component: (
      //     <Javascript description="Download the Javascript SDK to help you integrate this AI service with your application. Once you setup your configuration, use the token generator below to test the servcie with a number of free calls." />
      //   ),
      // },
    ];
    return (
      <Grid container className={classes.installAndRunContainer}>
        <Grid item xs={12} sm={12} md={8} lg={8} className={classes.overViewContainer}>
          <div className={classes.integrationSetupContainer}>
            <h2>Integration Setup</h2>
            <div className={classes.integrationContent}>
              <StyledTabs tabs={tabs} onTabChange={this.handleTabChange} activeTab={activeTab} />
            </div>
          </div>
          <div className={classes.integrationSetupContainer}>
            <h2>Free Call Authentication Token</h2>
            <div className={classes.overViewContainer}>
              <div className={classes.freecallContainer}>
                <Typography className={classes.intSetupDesc}>
                  Generate the free call token to use in your SDK. The address used to generate this token should be the
                  same as the identity specified in your SDK configuation. This will allow you to invoke the service
                  from your SDK on a trial basis
                </Typography>
                <div className={classes.textfieldContainer}>
                  <div>
                    <InfoIcon className={classes.infoIcon} />
                    <TextField
                      id="outlined-user-name"
                      label="Public Address"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      value={this.state.publickey}
                      onChange={this.handlePublicKey}
                    />
                    <Typography className={classes.publicAddDesc}>
                      Ethereum address used in your SDK. This is the public address corresponding to the private key you
                      use in the SDK
                    </Typography>
                  </div>
                  {!downloadTokenURL && (
                    <Button
                      type="submit"
                      className={classes.DownloadTokenBtn}
                      color="primary"
                      onClick={this.generateToken}
                    >
                      Generate Token
                    </Button>
                  )}
                  {downloadTokenURL && (
                    <a href={downloadTokenURL} download={downloadTokenFileName}>
                      Download Token
                    </a>
                  )}
                </div>
                <AlertBox type={alert.type} message={alert.message} />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
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
}

const mapDispatchToProps = (dispatch) => ({
  downloadAuthToken: (serviceid, groupid, publicKey, orgid) =>
    dispatch(serviceActions.downloadAuthToken(serviceid, groupid, publicKey, orgid)),
});
export default connect(null, mapDispatchToProps)(withStyles(useStyles)(InstallAndRunService));
