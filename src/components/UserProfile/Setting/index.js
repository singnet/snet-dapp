import React, { Component } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import ErrorMsgBox from "../../common/ErrorMsgBox";
import StyledButton from "../../common/StyledButton";

import { useStyles } from "./styles";

class Setting extends Component {
  render() {
    const { classes } = this.props;

    const handleChange = name => event => {
      this.setState({
        name: event.target.value,
      });
    };

    return (
      <Grid container spacing={24} className={classes.settingMainContainer}>
        <Grid item xs={12} sm={12} md={8} lg={8} className={classes.settingsContainer}>
          <h3>Setting</h3>
          <div className={classes.settingsContent}>
            <div>
              <TextField
                id="outlined-name"
                label="Full Name"
                className={classes.styledTextField}
                value="Greg Kuebler"
                onChange={handleChange("name")}
                margin="normal"
                variant="outlined"
              />
              <p>
                Your name is only for your display and billing purposes. Your name will not be visible to other users.
              </p>
            </div>

            <div>
              <TextField
                id="outlined-name"
                label="User Name (20 char max)"
                className={classes.styledTextField}
                value="waythingswork"
                onChange={handleChange("name")}
                margin="normal"
                variant="outlined"
              />
              <p>Your username will be visible to other users when you post comments.</p>
            </div>

            <div>
              <TextField
                id="outlined-name"
                label="Email"
                className={classes.styledTextField}
                value="greg.kuebler@singularitynet.io"
                onChange={handleChange("name")}
                margin="normal"
                variant="outlined"
              />
            </div>

            <div>
              <h4>Password</h4>
              <Link>Change Password</Link>
            </div>

            <div>
              <h4>Account Connections</h4>
              <Link>
                <Icon className={clsx(classes.icon, "fab fa-github")} />
                Connect Account with Github
              </Link>
            </div>

            <div className={classes.autoRefillCredits}>
              <h4>Auto Refill Credits</h4>
              <Icon className={clsx(classes.icon, "fas fa-info-circle")} />
              <FormControlLabel
                control={
                  <Checkbox
                    className={classes.checkkBox}
                    checked={false}
                    onChange={handleChange("")}
                    value=""
                    color="primary"
                    disabled={true}
                  />
                }
                label="Auto refill credits when depleted"
              />
              <TextField
                id="outlined-select-currency-native"
                select
                label="Amount"
                className={classes.selectBox}
                value={" "}
                // onChange={handleChange()}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
                variant="outlined"
              ></TextField>
              <p>
                Please Note: If your credit card or wallet account has insufficient funds, transfer will not commence
                and you will be notified via email.{" "}
              </p>
            </div>

            <div className={classes.notification}>
              <h4>Notifications</h4>
              <FormControlLabel
                control={
                  <Checkbox
                    className={classes.checkkBox}
                    checked={true}
                    onChange={handleChange("")}
                    value=""
                    color="primary"
                  />
                }
                label="Receive notifications via email"
              />
              <p>
                This includes notifications about algorithms, comments, etc. Account related information will still be
                sent to your email.
              </p>
            </div>

            <ErrorMsgBox showErr={true} errorMsg="undefined" />

            <div className={classes.btnContainer}>
              <StyledButton btnText="save changes" disabled />
              <StyledButton btnText="delete account" type="red" />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(Setting);
