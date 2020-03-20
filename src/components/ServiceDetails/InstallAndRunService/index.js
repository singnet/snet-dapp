import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import InfoIcon from "@material-ui/icons/Info";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import Web3 from "web3";

import StyledTabs from "../StyledTabs";
import Python from "./Python";
import Javascript from "./Javascript";
import ProjectDetails from "../ProjectDetails";
import { useStyles } from "./styles";
import { serviceActions } from "../../../Redux/actionCreators";
import AlertBox, { alertTypes } from "../../common/AlertBox";

const web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER, null, {});
const downloadTokenFileName = "authToken.txt";

class InstallAndRunService extends Component {
  state = {
    activeTab: 0,
    publickey: "",
    downloadTokenURL: "",
    alert: {},
  };

  handleTabChange = activeTab => {
    this.setState({ activeTab });
  };

  downloadToken = async e => {
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

  handlePublicKey = event => {
    this.setState({ publickey: event.currentTarget.value });
  };

  render() {
    const { classes, service } = this.props;
    const { activeTab, downloadTokenURL, alert } = this.state;
    const tabs = [
      { name: "Python", activeIndex: 0, component: <Python /> },
      { name: "Javascript", activeIndex: 1, component: <Javascript /> },
    ];
    return (
      <Grid container spacing={24} className={classes.installAndRunContainer}>
        <Grid item xs={12} sm={12} md={8} lg={8} className={classes.overViewContainer}>
          <div className={classes.integrationSetupContainer}>
            <h3>Integration Setup</h3>
            <div className={classes.overViewContainer}>
              <Typography className={classes.intSetupTitle}>Free Call Authentication Token</Typography>
              <Typography className={classes.intSetupDesc}>
                Generate the free call token to use in your SDK. The address used to generate this token should be the
                same as the identity specified in your SDK configuation. This will allow you to invoke the service from
                your SDK on a trial basis
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
                    autoFocus
                    onChange={this.handlePublicKey}
                  />
                  <Typography className={classes.publicAddDesc}>
                    Explanation about where to look for the public address.
                  </Typography>
                </div>
                <Button type="submit" className={classes.DownloadTokenBtn} color="primary" onClick={this.downloadToken}>
                  Download Token
                </Button>
              </div>
              {downloadTokenURL && (
                <a href={downloadTokenURL} download={downloadTokenFileName}>
                  click here to download the Token
                </a>
              )}
              <AlertBox type={alert.type} message={alert.message} />
            </div>
          </div>
          <div className={classes.integrationSetupContainer}>
            <h3>Installation and Execution</h3>
            <div className={classes.integrationContent}>
              <StyledTabs tabs={tabs} onTabChange={this.handleTabChange} activeTab={activeTab} />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <ProjectDetails projectURL={service.url} />
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  downloadAuthToken: (serviceid, groupid, publicKey, orgid) =>
    dispatch(serviceActions.downloadAuthToken(serviceid, groupid, publicKey, orgid)),
});
export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles)(InstallAndRunService));
