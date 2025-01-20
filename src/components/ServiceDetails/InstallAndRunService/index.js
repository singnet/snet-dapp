import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
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
import AlertBox, { alertTypes } from "../../common/AlertBox";
import Card from "../../common/Card";
import StyledButton from "../../common/StyledButton";

const web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER, null, {});
const downloadTokenFileName = "authToken.txt";

class InstallAndRunService extends Component {
  state = {
    activeTab: 0,
    publickey: "",
    downloadTokenURL: "",
    alert: {},
    isTokenGenerating: false,
    isAddressValid: false,
  };

  handleTabChange = (activeTab) => {
    this.setState({ activeTab, alert: {}, downloadTokenURL: "" });
  };

  isValidAddress = (address) => {
    try {
      const checksumAddress = web3.utils.toChecksumAddress(address);
      return checksumAddress ? true : false;
    } catch (error) {
      return false;
    }
  };

  generateToken = async () => {
    if (this.state.isTokenGenerating) {
      return;
    }

    try {
      this.setState({ alert: {}, downloadTokenURL: "", isTokenGenerating: true });
      const { service, groupId, downloadAuthToken } = this.props;
      const downloadTokenURL = await downloadAuthToken(
        service.service_id,
        groupId,
        this.state.publickey,
        service.org_id
      );
      this.setState({ downloadTokenURL });
    } catch (e) {
      this.setState({ alert: { type: alertTypes.ERROR, message: "Unable to download the token. Please try later" } });
    } finally {
      this.setState({ isTokenGenerating: false });
    }
  };

  handlePublicKey = (event) => {
    const address = event.currentTarget.value;
    this.setState({ publickey: address, downloadTokenURL: "" });
    const isAddressValid = this.isValidAddress(address);
    if (!isAddressValid) {
      this.setState({ alert: { type: alertTypes.ERROR, message: "invalid public key" }, isAddressValid: false });
    } else {
      this.setState({ alert: {}, isAddressValid: true });
    }
  };

  render() {
    const { classes, service } = this.props;
    const { activeTab, downloadTokenURL, alert, isTokenGenerating, isAddressValid } = this.state;
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
      <Grid container className={classes.installAndRunContainer} spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={8} className={classes.overViewContainer}>
          <Card
            header="Integration Setup"
            children={
              <>
                <div className={classes.integrationContent}>
                  <StyledTabs tabs={tabs} onTabChange={this.handleTabChange} activeTab={activeTab} />
                </div>
              </>
            }
          />
          <Card
            header="Free Call Authentication Token"
            children={
              <div className={classes.overViewContainer}>
                <div className={classes.freecallContainer}>
                  <Typography className={classes.intSetupDesc}>
                    Generate the free call token to use in your SDK. The address used to generate this token should be
                    the same as the identity specified in your SDK configuation. This will allow you to invoke the
                    service from your SDK on a trial basis
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
                        Ethereum address used in your SDK. This is the public address corresponding to the private key
                        you use in the SDK
                      </Typography>
                    </div>
                    {!downloadTokenURL && (
                      <StyledButton
                        type="blue"
                        btnText="Generate Token"
                        onClick={this.generateToken}
                        disabled={isTokenGenerating || !isAddressValid}
                      />
                    )}
                    {downloadTokenURL && (
                      <StyledButton
                        type="blue"
                        btnText={
                          <a
                            className={classes.downloadTokenLink}
                            href={downloadTokenURL}
                            download={downloadTokenFileName}
                          >
                            Download Token
                          </a>
                        }
                        onClick={this.generateToken}
                      />
                    )}
                  </div>
                  <AlertBox type={alert.type} message={alert.message} />
                </div>
              </div>
            }
          />
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
