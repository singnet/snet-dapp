import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/styles";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";

import StyledTextField from "../../../../common/StyledTextField";
import StyledButton from "../../../../common/StyledButton";
import ErrorMsgBox from "../../../../common/ErrorMsgBox";
import { useStyles } from "./styles";

class Purchase extends Component {
  state = {
    accountBalance: [
      "120 credits (33.123456789 AGI)",
      "120 credits (33.123456789 AGI)",
      "120 credits (33.123456789 AGI)",
    ],
  };

  render() {
    const { classes } = this.props;
    const { accountBalance } = this.state;

    return (
      <div className={classes.purchaseContainer}>
        <div className={classes.avaliableAccBal}>
          <TextField
            id="outlined-select-currency-native"
            select
            label="Avaliable Account Balance"
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
          >
            {accountBalance.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </div>
        <div className={classes.unitAmtPriceTotalContainer}>
          <div>
            <Icon className={clsx(classes.icon, "fas fa-info-circle")} />
            <StyledTextField label={"Unit Amount"} />
          </div>
          <div className={classes.priceTotal}>
            <Icon className={clsx(classes.icon, "fas fa-info-circle")} />
            <StyledTextField label={"Price Total"} />
          </div>
        </div>
        <ErrorMsgBox errorMsg={"error"} showErr={true} />
        <div className={classes.demoContainerButtons}>
          <StyledButton type="transparent" btnText="back" />
          <StyledButton btnText="purchase and run" />
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Purchase);
