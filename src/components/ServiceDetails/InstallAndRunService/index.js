import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import InfoIcon from "@material-ui/icons/Info";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Web3 from "web3";

import StyledTabs from "../StyledTabs";
import Python from "./Python";
import Javascript from "./Javascript";
import ProjectDetails from "../ProjectDetails";
import { useStyles } from "./styles";
import { serviceActions } from "../../../Redux/actionCreators";
import AlertBox from "../../common/AlertBox";

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

  downloadToken = async () => {
    this.setState({ alert: {}, downloadTokenURL: "" });
    if (web3.utils.isAddress(this.state.publickey)) {
      const { service, groupId } = this.props;
      const downloadTokenURL = await this.props.downloadAuthToken(
        service.service_id,
        groupId,
        this.state.publickey,
        service.org_id
      );
      this.setState({ downloadTokenURL });
    } else {
      this.setState({
        alert: {
          type: "error",
          message: "invalid public key",
        },
      });
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
              <h4>Free Call Authentication Token</h4>
              <p>
                Your fellow collaborators can help you set up the technical stuff and manage the AI service. Everything
                is faster and better with teamwork. Once your collaborators accept your invite, you will be able to add
                them to the company blockchain for access.
              </p>

              <InfoIcon className={classes.infoIcon} />
              <TextField
                id="outlined-user-name"
                label="public Address"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.publickey}
                autoFocus
                onChange={this.handlePublicKey}
              />

              <Button
                className={classes.DownloadTokenBtn}
                color="primary"
                onClick={() => {
                  this.downloadToken();
                }}
              >
                Generate Token
              </Button>
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
export default connect(null, mapDispatchToProps)(withStyles(useStyles)(InstallAndRunService));
